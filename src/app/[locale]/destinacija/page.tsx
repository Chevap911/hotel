"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const sections = [
    {
        key: "beaches",
        titleKey: "beaches_title",
        textKey: "beaches_text",
        image: "/images/destinacije/rajska_plaza.jpg",
    },
    {
        key: "activities",
        titleKey: "activities_title",
        textKey: "activities_text",
        image: "/images/destinacije/aktivni_odmor.jpg",
    },
    {
        key: "gastro",
        titleKey: "gastro_title",
        textKey: "gastro_text",
        image: "/images/wine_vineyard.jpg",
    },
    {
        key: "culture",
        titleKey: "culture_title",
        textKey: "culture_text",
        image: "/images/destinacije/kultura.webp",
    },
    {
        key: "korcula",
        titleKey: "korcula_title",
        textKey: "korcula_text",
        image: "/images/destinacije/korcula.jpg",
    },
    {
        key: "family",
        titleKey: "family_title",
        textKey: "family_text",
        image: "/images/family_beach.jpg",
    },
];

export default function DestinationPage() {
    const t = useTranslations("destination");

    return (
        <>
            {/* Hero */}
            <section className="relative pt-36 pb-28 overflow-hidden">
                <Image
                    src="/images/707166612.jpg"
                    alt="Orebić panorama"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                <div className="hero-overlay absolute inset-0" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="label-sm text-white/40 mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Orebić & Pelješac
                        </div>
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.05]"
                            style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                        >
                            {t("title")}
                        </h1>
                        <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-xl">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            {sections.map((section, i) => (
                <section
                    key={section.key}
                    className={`py-20 lg:py-32 ${i % 2 === 0 ? "bg-white" : "bg-bg"}`}
                >
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""
                                }`}
                        >
                            <motion.div
                                variants={fadeInUp}
                                className={i % 2 === 1 ? "lg:col-start-2" : ""}
                            >
                                <div className="overflow-hidden img-zoom aspect-[4/3]">
                                    <Image
                                        src={section.image}
                                        alt={section.key}
                                        width={700}
                                        height={525}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <div className="label-sm mb-6">{section.key}</div>
                                <h2
                                    className="text-2xl sm:text-3xl lg:text-4xl text-primary mb-6 leading-[1.15]"
                                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                                >
                                    {t(section.titleKey as "beaches_title")}
                                </h2>
                                <p className="text-muted text-base leading-relaxed max-w-lg">
                                    {t(section.textKey as "beaches_text")}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            ))}
        </>
    );
}
