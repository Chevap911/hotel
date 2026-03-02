import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// iCal URLs from Booking.com - to be filled in with actual URLs
const ICAL_URLS: Record<string, string> = {
    "double-room": process.env.ICAL_DOUBLE_ROOM || "",
    "triple-room": process.env.ICAL_TRIPLE_ROOM || "",
    "suite": process.env.ICAL_SUITE || "",
    "two-bedroom-suite": process.env.ICAL_TWO_BEDROOM_SUITE || "",
    "royal-suite-sea-view": process.env.ICAL_ROYAL_SUITE || "",
    "economy-double": process.env.ICAL_ECONOMY_DOUBLE || "",
};

interface BookingEvent {
    roomId: string;
    checkIn: string;
    checkOut: string;
    summary: string;
}

function parseICalData(icalData: string, roomId: string): BookingEvent[] {
    const events: BookingEvent[] = [];
    const eventBlocks = icalData.split("BEGIN:VEVENT");

    for (const block of eventBlocks.slice(1)) {
        const dtStartMatch = block.match(/DTSTART(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);
        const dtEndMatch = block.match(/DTEND(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);
        const summaryMatch = block.match(/SUMMARY:(.*)/);

        if (dtStartMatch && dtEndMatch) {
            events.push({
                roomId,
                checkIn: `${dtStartMatch[1]}-${dtStartMatch[2]}-${dtStartMatch[3]}`,
                checkOut: `${dtEndMatch[1]}-${dtEndMatch[2]}-${dtEndMatch[3]}`,
                summary: summaryMatch ? summaryMatch[1].trim() : "Booking",
            });
        }
    }

    return events;
}

export async function GET() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json(
                { error: "Supabase not configured" },
                { status: 500 }
            );
        }

        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        const allBookings: BookingEvent[] = [];

        for (const [roomId, url] of Object.entries(ICAL_URLS)) {
            if (!url) continue;

            try {
                const response = await fetch(url, { cache: "no-store" });
                const icalData = await response.text();
                const bookings = parseICalData(icalData, roomId);
                allBookings.push(...bookings);
            } catch (error) {
                console.error(`Error fetching iCal for ${roomId}:`, error);
            }
        }

        if (allBookings.length > 0) {
            // Clear existing future bookings and reinsert
            const today = new Date().toISOString().split("T")[0];

            await supabase
                .from("bookings")
                .delete()
                .gte("check_in", today)
                .eq("source", "booking.com");

            const insertData = allBookings.map((booking) => ({
                room_id: booking.roomId,
                check_in: booking.checkIn,
                check_out: booking.checkOut,
                source: "booking.com",
            }));

            await supabase.from("bookings").insert(insertData);
        }

        return NextResponse.json({
            success: true,
            synced: allBookings.length,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("iCal sync error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
