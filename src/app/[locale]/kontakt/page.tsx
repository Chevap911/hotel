"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { rooms } from "@/lib/rooms";

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function ContactPage() {
    const t = useTranslations("contact");
    const roomsT = useTranslations("rooms");
    const [formData, setFormData] = useState({
        checkin: "",
        checkout: "",
        room_type: "",
        adults: "2",
        children: "0",
        name: "",
        email: "",
        phone: "",
        message: "",
        gdpr: false,
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({
                    checkin: "",
                    checkout: "",
                    room_type: "",
                    adults: "2",
                    children: "0",
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    gdpr: false,
                });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const inputClasses = "w-full px-0 py-3.5 bg-transparent border-0 border-b border-border text-primary text-sm focus:ring-0 focus:border-accent outline-none transition-colors";
    const selectClasses = "w-full px-0 py-3.5 bg-transparent border-0 border-b border-border text-primary text-sm focus:ring-0 focus:border-accent outline-none transition-colors appearance-none cursor-pointer";
    const labelClasses = "block text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-muted mb-1";

    return (
        <>
            {/* Header */}
            <section className="relative pt-36 pb-24 bg-primary">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="label-sm text-white/40 mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {t("info_title")}
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

            <section className="py-20 lg:py-32 bg-bg">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Contact Info & Map */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:col-span-1 space-y-10"
                        >
                            <div>
                                <div className="label-sm mb-8">{t("info_title")}</div>
                                <div className="space-y-8">
                                    <div>
                                        <span className="block text-[0.65rem] uppercase tracking-[0.15em] text-muted mb-2">
                                            Adresa
                                        </span>
                                        <p className="text-sm text-primary">{t("address")}</p>
                                    </div>
                                    <div>
                                        <span className="block text-[0.65rem] uppercase tracking-[0.15em] text-muted mb-2">
                                            Telefon
                                        </span>
                                        <a
                                            href={`tel:${t("phone")}`}
                                            className="text-sm text-primary hover:text-accent transition-colors"
                                        >
                                            {t("phone")}
                                        </a>
                                    </div>
                                    <div>
                                        <span className="block text-[0.65rem] uppercase tracking-[0.15em] text-muted mb-2">
                                            Email
                                        </span>
                                        <a
                                            href={`mailto:${t("email")}`}
                                            className="text-sm text-primary hover:text-accent transition-colors"
                                        >
                                            {t("email")}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.1!2d17.1!3d42.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a5e4e8e0e0001%3A0x1!2sPostup+3b%2C+20230+Orebi%C4%87!5e0!3m2!1sen!2shr!4v1"
                                    width="100%"
                                    height="280"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Villa Antonio location"
                                />
                            </div>
                        </motion.div>

                        {/* Inquiry Form */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white border border-border-light p-8 lg:p-12">
                                <div className="label-sm mb-4">{t("form_title")}</div>
                                <h2
                                    className="text-2xl sm:text-3xl text-primary mb-10"
                                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                                >
                                    {t("form_title")}
                                </h2>

                                {status === "success" ? (
                                    <div className="text-center py-16">
                                        <div className="text-4xl mb-4">✓</div>
                                        <p
                                            className="text-xl text-primary mb-2"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            {t("success")}
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Dates */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelClasses}>
                                                    {t("checkin")} *
                                                </label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={formData.checkin}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, checkin: e.target.value })
                                                    }
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClasses}>
                                                    {t("checkout")} *
                                                </label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={formData.checkout}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, checkout: e.target.value })
                                                    }
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>

                                        {/* Room Type */}
                                        <div>
                                            <label className={labelClasses}>
                                                {t("room_type")} *
                                            </label>
                                            <select
                                                required
                                                value={formData.room_type}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, room_type: e.target.value })
                                                }
                                                className={selectClasses}
                                            >
                                                <option value="">{t("select_room")}</option>
                                                {rooms.map((room) => (
                                                    <option key={room.id} value={room.id}>
                                                        {roomsT(`${room.roomKey}.name` as "doubleRoom.name")}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Guests */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelClasses}>
                                                    {t("adults")} *
                                                </label>
                                                <select
                                                    required
                                                    value={formData.adults}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, adults: e.target.value })
                                                    }
                                                    className={selectClasses}
                                                >
                                                    {[1, 2, 3, 4, 5].map((n) => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClasses}>
                                                    {t("children")}
                                                </label>
                                                <select
                                                    value={formData.children}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, children: e.target.value })
                                                    }
                                                    className={selectClasses}
                                                >
                                                    {[0, 1, 2, 3, 4].map((n) => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Personal Info */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className={labelClasses}>
                                                    {t("name")} *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, name: e.target.value })
                                                    }
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClasses}>
                                                    {t("email_label")} *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, email: e.target.value })
                                                    }
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClasses}>
                                                {t("phone_label")}
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, phone: e.target.value })
                                                }
                                                className={inputClasses}
                                            />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className={labelClasses}>
                                                {t("message")}
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, message: e.target.value })
                                                }
                                                className={`${inputClasses} resize-none`}
                                            />
                                        </div>

                                        {/* GDPR */}
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                required
                                                checked={formData.gdpr}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, gdpr: e.target.checked })
                                                }
                                                className="mt-1 w-4 h-4 border-border text-accent focus:ring-accent accent-[#b8956a]"
                                            />
                                            <label className="text-xs text-muted leading-relaxed">
                                                {t("gdpr")}
                                            </label>
                                        </div>

                                        {status === "error" && (
                                            <div className="border border-wine/20 text-wine px-4 py-3 text-sm">
                                                {t("error")}
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === "loading" ? "..." : t("submit")}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
