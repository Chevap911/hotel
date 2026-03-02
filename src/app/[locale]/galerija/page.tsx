"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const galleryImages = {
    hotel: [
        "/images/179337101.jpg",
        "/images/179337152.jpg",
        "/images/179337153.jpg",
        "/images/179337155.jpg",
        "/images/179337156.jpg",
        "/images/179337157.jpg",
        "/images/179337158.jpg",
        "/images/179337159.jpg",
        "/images/707149187.jpg",
    ],
    pool: [
        "/images/179337160.jpg",
        "/images/179337163.jpg",
        "/images/179337164.jpg",
        "/images/179337510.jpg",
        "/images/179337511.jpg",
        "/images/179337513.jpg",
    ],
    views: [
        "/images/707156624.jpg",
        "/images/707166603.jpg",
        "/images/707166604.jpg",
        "/images/707166605.jpg",
        "/images/707166609.jpg",
        "/images/707166610.jpg",
        "/images/707166612.jpg",
        "/images/707166613.jpg",
        "/images/707168693.jpg",
    ],
    rooms: [
        "/images/362423122.jpg",
        "/images/362423130.jpg",
        "/images/362423132.jpg",
        "/images/362423136.jpg",
        "/images/362423142.jpg",
        "/images/362423150.jpg",
        "/images/362423359.jpg",
        "/images/362423394.jpg",
        "/images/707152431.jpg",
        "/images/707152470.jpg",
        "/images/707155875.jpg",
        "/images/707155880.jpg",
    ],
};

const allImages = [
    ...galleryImages.hotel,
    ...galleryImages.pool,
    ...galleryImages.views,
    ...galleryImages.rooms,
];

type CategoryKey = "all" | "hotel" | "pool" | "views" | "rooms";

export default function GalleryPage() {
    const t = useTranslations("gallery");
    const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filters: { key: CategoryKey; label: string }[] = [
        { key: "all", label: t("all") },
        { key: "hotel", label: t("hotel") },
        { key: "pool", label: t("pool") },
        { key: "views", label: t("views") },
        { key: "rooms", label: t("rooms_filter") },
    ];

    const filteredImages =
        activeFilter === "all"
            ? allImages
            : galleryImages[activeFilter as keyof typeof galleryImages];

    return (
        <>
            {/* Header */}
            <section className="relative pt-36 pb-24 bg-primary">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="label-sm text-white/40 mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Villa Antonio
                    </div>
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.05]"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                    >
                        {t("title")}
                    </h1>
                    <p className="text-white/60 text-base lg:text-lg max-w-xl leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-6 bg-white sticky top-20 lg:top-24 z-30 border-b border-border-light">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex flex-wrap gap-2 justify-start">
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-4 py-2 text-[0.7rem] font-semibold tracking-[0.12em] uppercase transition-all ${activeFilter === filter.key
                                        ? "bg-primary text-white"
                                        : "text-muted hover:text-primary"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-12 lg:py-20 bg-bg">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="masonry">
                        {filteredImages.map((img, i) => (
                            <motion.div
                                key={img}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.02 }}
                                className="overflow-hidden cursor-pointer img-zoom"
                                onClick={() => setLightboxIndex(i)}
                            >
                                <Image
                                    src={img}
                                    alt={`Gallery photo ${i + 1}`}
                                    width={600}
                                    height={i % 3 === 0 ? 500 : i % 3 === 1 ? 400 : 350}
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-6 right-6 text-white text-2xl hover:text-accent transition-colors"
                    >
                        ✕
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex((prev) =>
                                prev !== null ? (prev > 0 ? prev - 1 : filteredImages.length - 1) : 0
                            );
                        }}
                        className="absolute left-6 text-white text-3xl hover:text-accent transition-colors"
                    >
                        ‹
                    </button>
                    <Image
                        src={filteredImages[lightboxIndex]}
                        alt={`Gallery fullscreen ${lightboxIndex + 1}`}
                        width={1400}
                        height={900}
                        className="max-h-[90vh] w-auto object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex((prev) =>
                                prev !== null ? (prev < filteredImages.length - 1 ? prev + 1 : 0) : 0
                            );
                        }}
                        className="absolute right-6 text-white text-3xl hover:text-accent transition-colors"
                    >
                        ›
                    </button>
                    <div className="absolute bottom-6 text-white/50 text-[0.7rem] tracking-[0.15em] uppercase">
                        {lightboxIndex + 1} / {filteredImages.length}
                    </div>
                </div>
            )}
        </>
    );
}
