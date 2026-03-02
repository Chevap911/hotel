"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
};

const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function FAQPage() {
    const t = useTranslations("faq");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <>
            {/* Header */}
            <section className="relative pt-36 pb-24 bg-primary">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="label-sm text-white/40 mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
                        FAQ
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

            {/* FAQ Accordion */}
            <section className="py-20 lg:py-32 bg-bg">
                <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="divide-y divide-border"
                    >
                        {faqKeys.map((key) => (
                            <motion.div
                                key={key}
                                variants={fadeInUp}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === key ? null : key)}
                                    className="w-full flex items-center justify-between py-6 text-left hover:text-accent transition-colors group"
                                >
                                    <span className="font-medium text-primary pr-6 text-[0.95rem] leading-relaxed group-hover:text-accent transition-colors">
                                        {t(`q${key}` as "q1")}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-muted shrink-0 transition-transform duration-300 ${openIndex === key ? "rotate-45" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-400 ${openIndex === key ? "max-h-96" : "max-h-0"
                                        }`}
                                >
                                    <div className="pb-6 text-muted text-sm leading-relaxed max-w-2xl">
                                        {t(`a${key}` as "a1")}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}
