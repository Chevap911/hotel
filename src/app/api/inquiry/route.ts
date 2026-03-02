import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            checkin,
            checkout,
            room_type,
            adults,
            children,
            name,
            email,
            phone,
            message,
            gdpr,
        } = body;

        // Validate required fields
        if (!checkin || !checkout || !room_type || !name || !email || !gdpr) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Save to Supabase if configured
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (supabaseUrl && supabaseKey) {
            const { createClient } = await import("@supabase/supabase-js");
            const supabase = createClient(supabaseUrl, supabaseKey);

            await supabase.from("inquiries").insert({
                check_in: checkin,
                check_out: checkout,
                room_type,
                adults: parseInt(adults),
                children: parseInt(children),
                full_name: name,
                email,
                phone: phone || null,
                message: message || null,
                gdpr_consent: gdpr,
            });
        }

        // Send notification email via Resend if configured
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            const { Resend } = await import("resend");
            const resend = new Resend(resendApiKey);

            // Email to hotel owner
            await resend.emails.send({
                from: "Villa Antonio <noreply@villa-antonio.hr>",
                to: "info@villa-antonio.hr",
                subject: `Novi upit: ${name} (${checkin} - ${checkout})`,
                html: `
          <h2>Novi upit za smještaj</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ime</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${phone || "-"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Dolazak</td><td style="padding:8px;border:1px solid #ddd">${checkin}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Odlazak</td><td style="padding:8px;border:1px solid #ddd">${checkout}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Soba</td><td style="padding:8px;border:1px solid #ddd">${room_type}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Odrasli</td><td style="padding:8px;border:1px solid #ddd">${adults}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Djeca</td><td style="padding:8px;border:1px solid #ddd">${children}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Poruka</td><td style="padding:8px;border:1px solid #ddd">${message || "-"}</td></tr>
          </table>
        `,
            });

            // Confirmation email to guest
            await resend.emails.send({
                from: "Villa Antonio <noreply@villa-antonio.hr>",
                to: email,
                subject: "Hvala na upitu | Thank you for your inquiry - Villa Antonio",
                html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <h1 style="color:#1b4965">Villa Antonio</h1>
            <p>Dragi/a ${name},</p>
            <p>Hvala Vam na upitu! Primili smo Vaš zahtjev za smještaj u periodu od <strong>${checkin}</strong> do <strong>${checkout}</strong>.</p>
            <p>Odgovoriti ćemo Vam u najkraćem mogućem roku s personaliziranom ponudom.</p>
            <hr style="border:1px solid #eee;margin:20px 0">
            <p style="color:#888;font-size:14px">
              Hotel Pansion Villa Antonio<br>
              Postup 3b, 20230 Orebić, Hrvatska<br>
              Tel: +385 20 713 199
            </p>
          </div>
        `,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Inquiry API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
