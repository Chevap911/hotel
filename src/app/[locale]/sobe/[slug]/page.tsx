"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { rooms, amenityIcons } from "@/lib/rooms";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

export default function RoomPage() {
    const params = useParams();
    const slug = params.slug as string;
    const t = useTranslations("rooms");
    const amenityT = useTranslations("amenity");
    const [selectedImage, setSelectedImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const room = rooms.find((r) => r.slug === slug);
    if (!room) return notFound();

    return (
        <>
            {/* Breadcrumb */}
            <section className="pt-28 pb-4 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <Link
                        href="/sobe"
                        className="text-muted hover:text-primary transition-colors text-[0.7rem] font-semibold tracking-[0.1em] uppercase"
                    >
                        ← {t("back_to_rooms")}
                    </Link>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="bg-white pb-12">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-[4/3] overflow-hidden cursor-pointer img-zoom"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <Image
                                src={room.images[selectedImage]}
                                alt={`${room.slug} photo ${selectedImage + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </motion.div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-2 gap-3">
                            {room.images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative aspect-[4/3] overflow-hidden cursor-pointer transition-all ${selectedImage === i
                                            ? "ring-2 ring-accent"
                                            : "opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${room.slug} thumbnail ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="25vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Room Details */}
            <section className="py-16 lg:py-28 bg-bg">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="label-sm mb-6">Room Details</div>
                            <h1
                                className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-6 leading-[1.1]"
                                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                            >
                                {t(`${room.roomKey}.name` as "doubleRoom.name")}
                            </h1>
                            <div className="flex flex-wrap gap-6 mb-8 text-xs text-muted tracking-wide uppercase">
                                <span>{room.maxOccupancy} {t("guests")}</span>
                                <span className="w-[1px] h-3 bg-border self-center" />
                                <span>{room.sizeSqm} {t("sqm")}</span>
                                <span className="w-[1px] h-3 bg-border self-center" />
                                <span>{room.beds}</span>
                            </div>
                            <p className="text-muted text-base lg:text-lg leading-relaxed mb-14 max-w-2xl">
                                {t(`${room.roomKey}.description` as "doubleRoom.description")}
                            </p>

                            {/* Amenities */}
                            <div className="label-sm mb-6">{t("amenities")}</div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
                                {room.amenities.map((amenity) => (
                                    <div
                                        key={amenity}
                                        className="flex items-center gap-3 py-4 border-b border-border-light"
                                    >
                                        <span className="text-lg">{amenityIcons[amenity]}</span>
                                        <span className="text-sm text-primary">
                                            {amenityT(amenity as "seaview")}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Availability Calendar */}
                            <div className="label-sm mb-6">{t("availability")}</div>
                            <div className="bg-white border border-border-light p-6 lg:p-8">
                                <div className="flex items-center gap-6 mb-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-accent/20 border border-accent/30" />
                                        <span className="text-xs text-muted">{t("available")}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-muted/20 border border-muted/30" />
                                        <span className="text-xs text-muted">{t("unavailable")}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                                        <div key={d} className="text-center text-[0.65rem] font-semibold text-muted py-2 uppercase tracking-wider">
                                            {d}
                                        </div>
                                    ))}
                                    {Array.from({ length: 35 }, (_, i) => {
                                        const day = i - 2;
                                        const isValid = day >= 1 && day <= 30;
                                        const isUnavailable = isValid && [5, 6, 7, 12, 13, 14, 15, 20, 21].includes(day);
                                        return (
                                            <div
                                                key={i}
                                                className={`text-center py-2 text-sm ${!isValid
                                                        ? "text-transparent"
                                                        : isUnavailable
                                                            ? "bg-muted/10 text-muted-light"
                                                            : "bg-accent/10 text-primary hover:bg-accent/20"
                                                    }`}
                                            >
                                                {isValid ? day : ""}
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-[0.65rem] text-muted mt-4 italic" style={{ fontFamily: "var(--font-display)" }}>
                                    * Calendar data syncs with Booking.com availability
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 bg-white border border-border-light p-8">
                                <h3
                                    className="text-xl text-primary mb-6"
                                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                                >
                                    {t(`${room.roomKey}.name` as "doubleRoom.name")}
                                </h3>
                                <div className="space-y-4 mb-8 text-sm text-muted">
                                    <div className="flex justify-between py-2 border-b border-border-light">
                                        <span>Max</span>
                                        <span className="font-medium text-primary">{room.maxOccupancy} {t("guests")}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-border-light">
                                        <span>Size</span>
                                        <span className="font-medium text-primary">{room.sizeSqm} {t("sqm")}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-border-light">
                                        <span>Beds</span>
                                        <span className="font-medium text-primary">{room.beds}</span>
                                    </div>
                                </div>
                                <Link
                                    href="/kontakt"
                                    className="btn-primary w-full justify-center"
                                >
                                    {t("request_quote")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-6 right-6 text-white text-2xl hover:text-accent transition-colors"
                    >
                        ✕
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage((prev) => (prev > 0 ? prev - 1 : room.images.length - 1));
                        }}
                        className="absolute left-6 text-white text-3xl hover:text-accent transition-colors"
                    >
                        ‹
                    </button>
                    <Image
                        src={room.images[selectedImage]}
                        alt={`${room.slug} full`}
                        width={1200}
                        height={800}
                        className="max-h-[85vh] w-auto object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage((prev) => (prev < room.images.length - 1 ? prev + 1 : 0));
                        }}
                        className="absolute right-6 text-white text-3xl hover:text-accent transition-colors"
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
}
