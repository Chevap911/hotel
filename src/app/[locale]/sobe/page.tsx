"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { rooms } from "@/lib/rooms";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

export default function RoomsPage() {
    const t = useTranslations("rooms");

    return (
        <>
            {/* Hero Header */}
            <section className="relative pt-36 pb-24 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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

            {/* Rooms Grid */}
            <section className="py-20 lg:py-32 bg-bg">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {rooms.map((room) => (
                            <motion.div key={room.id} variants={fadeInUp}>
                                <Link href={{ pathname: "/sobe/[slug]", params: { slug: room.slug } }}>
                                    <div className="card-editorial group h-full">
                                        <div className="img-zoom aspect-[16/10] relative">
                                            <Image
                                                src={room.images[0]}
                                                alt={room.slug}
                                                width={600}
                                                height={375}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                                        </div>
                                        <div className="p-6">
                                            <h2
                                                className="text-xl font-semibold text-primary mb-2"
                                                style={{ fontFamily: "var(--font-heading)" }}
                                            >
                                                {t(`${room.roomKey}.name` as "doubleRoom.name")}
                                            </h2>
                                            <p className="text-muted text-sm mb-5 line-clamp-2 leading-relaxed">
                                                {t(`${room.roomKey}.description` as "doubleRoom.description")}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs text-muted tracking-wide uppercase">
                                                    <span>{room.maxOccupancy} {t("guests")}</span>
                                                    <span className="w-[1px] h-3 bg-border" />
                                                    <span>{room.sizeSqm} {t("sqm")}</span>
                                                </div>
                                                <span className="link-arrow text-[0.7rem]">
                                                    {t("details")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}
