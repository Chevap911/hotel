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
    visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
    const t = useTranslations("home");
    const hero = useTranslations("hero");
    const roomsT = useTranslations("rooms");
    const testimonials = useTranslations("testimonials");

    const showcaseRooms = rooms.slice(0, 4);

    return (
        <>
            {/* ================================
                HERO — Full screen, left-aligned editorial
               ================================ */}
            <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
                <Image
                    src="/images/hero-villa-antonio.png"
                    alt="Villa Antonio - aerial view"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="hero-overlay absolute inset-0" />
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 lg:pb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="max-w-3xl"
                    >
                        <div className="label-sm text-white/60 mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                            Orebić, Pelješac
                        </div>
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.05] font-light"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {hero("title")}
                        </h1>
                        <p className="text-base sm:text-lg text-white/75 mb-12 max-w-xl leading-relaxed font-light">
                            {hero("subtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/sobe" className="btn-outline-light">
                                {hero("cta_rooms")}
                            </Link>
                            <Link href="/kontakt" className="btn-primary">
                                {hero("cta_inquiry")}
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute bottom-8 right-8 lg:right-12"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-white/40 text-[0.6rem] tracking-[0.2em] uppercase font-medium rotate-90 origin-center mb-4">
                            Scroll
                        </span>
                        <div className="w-[1px] h-12 bg-white/30" />
                    </div>
                </motion.div>
            </section>

            {/* ================================
                WELCOME / ABOUT — Editorial asymmetric
               ================================ */}
            <section className="py-24 lg:py-36 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 items-center"
                    >
                        <motion.div variants={fadeInUp} className="lg:col-span-5 lg:pr-8">
                            <div className="label-sm mb-8">{t("welcome_title").split(" ")[0]}</div>
                            <h2
                                className="text-3xl sm:text-4xl lg:text-[3.2rem] leading-[1.1] mb-8"
                                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                            >
                                {t("welcome_title")}
                            </h2>
                            <p className="text-muted text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
                                {t("welcome_text")}
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="rating-badge">
                                    ★ {t("welcome_rating")}
                                </div>
                                <span className="text-muted text-sm">
                                    {t("welcome_reviews")}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="relative lg:col-span-7">
                            <div className="grid grid-cols-12 gap-4 lg:gap-6">
                                <div className="col-span-7">
                                    <div className="overflow-hidden img-zoom aspect-[3/4]">
                                        <Image
                                            src="/images/517262506.jpg"
                                            alt="Villa Antonio pool"
                                            width={500}
                                            height={667}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-5 pt-12 space-y-3">
                                    <div className="overflow-hidden img-zoom aspect-[4/3]">
                                        <Image
                                            src="/images/179337163.jpg"
                                            alt="Villa Antonio view"
                                            width={400}
                                            height={300}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="overflow-hidden img-zoom aspect-square">
                                        <Image
                                            src="/images/362423428.jpg"
                                            alt="Villa Antonio terrace"
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ================================
                ROOMS SHOWCASE — Editorial cards
               ================================ */}
            <section className="py-24 lg:py-36 bg-bg-alt">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {/* Section header */}
                        <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
                            <div>
                                <div className="label-sm mb-6">{t("rooms_title")}</div>
                                <h2
                                    className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
                                    style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                                >
                                    {t("rooms_subtitle")}
                                </h2>
                            </div>
                            <Link href="/sobe" className="link-arrow mt-6 lg:mt-0">
                                {t("rooms_view_all")}
                            </Link>
                        </motion.div>

                        {/* Room cards */}
                        <motion.div
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                        >
                            {showcaseRooms.map((room) => (
                                <motion.div key={room.id} variants={fadeInUp}>
                                    <Link href={{ pathname: "/sobe/[slug]", params: { slug: room.slug } }}>
                                        <div className="card-editorial group">
                                            <div className="img-zoom aspect-[4/3] relative">
                                                <Image
                                                    src={room.images[0]}
                                                    alt={room.slug}
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                                                    {roomsT(`${room.roomKey}.name` as `doubleRoom.name`)}
                                                </h3>
                                                <div className="flex items-center gap-4 text-xs text-muted tracking-wide uppercase">
                                                    <span>{room.maxOccupancy} {roomsT("guests")}</span>
                                                    <span className="w-[1px] h-3 bg-border" />
                                                    <span>{room.sizeSqm} {roomsT("sqm")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ================================
                DESTINATION TEASER — Editorial 3-column
               ================================ */}
            <section className="py-24 lg:py-36 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="text-center mb-20">
                            <div className="label-sm justify-center mb-6">{t("destination_title")}</div>
                            <h2
                                className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-2xl mx-auto"
                                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                            >
                                {t("destination_title")}
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Taste */}
                            <motion.div variants={fadeInUp} className="group">
                                <div className="overflow-hidden img-zoom aspect-[3/4] mb-6">
                                    <Image
                                        src="/images/wine_vineyard.jpg"
                                        alt="Pelješac gastronomy — wine and local cuisine"
                                        width={500}
                                        height={667}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3
                                    className="text-xl lg:text-2xl mb-3"
                                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                                >
                                    {t("taste_title")}
                                </h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    {t("taste_text")}
                                </p>
                            </motion.div>

                            {/* Active */}
                            <motion.div variants={fadeInUp} className="group md:mt-12">
                                <div className="overflow-hidden img-zoom aspect-[3/4] mb-6">
                                    <Image
                                        src="/images/destinacije/aktivni_odmor.jpg"
                                        alt="Active holiday — windsurfing along Croatian coast"
                                        width={500}
                                        height={667}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3
                                    className="text-xl lg:text-2xl mb-3"
                                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                                >
                                    {t("active_title")}
                                </h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    {t("active_text")}
                                </p>
                            </motion.div>

                            {/* Korčula */}
                            <motion.div variants={fadeInUp} className="group">
                                <div className="overflow-hidden img-zoom aspect-[3/4] mb-6">
                                    <Image
                                        src="/images/destinacije/korcula.jpg"
                                        alt="Discover Korčula — aerial view of medieval old town"
                                        width={500}
                                        height={667}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3
                                    className="text-xl lg:text-2xl mb-3"
                                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                                >
                                    {t("discover_title")}
                                </h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    {t("discover_text")}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================================
                TESTIMONIALS — Editorial large quote
               ================================ */}
            <section className="py-24 lg:py-36 bg-bg-alt">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="mb-16">
                            <div className="label-sm mb-6">{t("testimonials_title")}</div>
                        </motion.div>

                        {/* Featured large quote */}
                        <motion.div variants={fadeInUp} className="mb-20">
                            <div className="max-w-4xl">
                                <p
                                    className="text-2xl sm:text-3xl lg:text-[2.5rem] leading-[1.35] text-primary mb-8 quote-editorial"
                                >
                                    &ldquo;{testimonials("t1_text")}&rdquo;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="divider-thin" />
                                    <div>
                                        <p className="font-semibold text-sm text-primary">
                                            {testimonials("t1_author")}
                                        </p>
                                        <p className="text-xs text-muted">
                                            {testimonials("t1_country")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Additional testimonials — smaller */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="border-t border-border pt-8"
                                >
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, j) => (
                                            <span key={j} className="text-accent text-sm">★</span>
                                        ))}
                                    </div>
                                    <p className="text-muted text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "var(--font-display)" }}>
                                        &ldquo;{testimonials(`t${i}_text`)}&rdquo;
                                    </p>
                                    <div>
                                        <p className="font-semibold text-sm text-primary">
                                            {testimonials(`t${i}_author`)}
                                        </p>
                                        <p className="text-xs text-muted">
                                            {testimonials(`t${i}_country`)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================================
                FINAL CTA — Editorial parallax
               ================================ */}
            <section className="relative py-28 lg:py-40 overflow-hidden">
                <Image
                    src="/images/pool_mediterranean.jpg"
                    alt="Mediterranean pool overlooking the sea"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-2xl"
                    >
                        <motion.div variants={fadeInUp} className="label-sm text-white/50 mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                            Villa Antonio
                        </motion.div>
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl sm:text-4xl lg:text-5xl text-white mb-8 leading-[1.1]"
                            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                        >
                            {t("cta_title")}
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-white/70 text-base lg:text-lg mb-12 leading-relaxed max-w-lg"
                        >
                            {t("cta_text")}
                        </motion.p>
                        <motion.div variants={fadeInUp}>
                            <Link href="/kontakt" className="btn-primary">
                                {t("cta_button")}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
