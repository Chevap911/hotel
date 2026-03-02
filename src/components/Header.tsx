"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOCALES = ["hr", "en", "de", "it"];

const localeLabels: Record<string, string> = {
    hr: "HR",
    en: "EN",
    de: "DE",
    it: "IT",
};

export default function Header() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const fullPathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { href: "/" as const, label: t("home") },
        { href: "/sobe" as const, label: t("rooms") },
        { href: "/destinacija" as const, label: t("destination") },
        { href: "/galerija" as const, label: t("gallery") },
        { href: "/kontakt" as const, label: t("contact") },
        { href: "/faq" as const, label: t("faq") },
    ];

    const switchLocale = (newLocale: string) => {
        const segments = fullPathname.split("/");
        if (segments.length > 1 && LOCALES.includes(segments[1])) {
            segments[1] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }
        const newPath = segments.join("/") || "/";
        router.push(newPath);
        setLangMenuOpen(false);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? "bg-[#f7f4f0]/95 backdrop-blur-xl border-b border-[#e2ddd6]/50"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex items-center justify-between h-20 lg:h-24">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span
                                className={`font-display text-2xl lg:text-[1.7rem] font-light italic tracking-wide transition-colors duration-500 ${scrolled ? "text-primary" : "text-white"
                                    }`}
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Villa Antonio
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase transition-colors duration-300 link-underline ${scrolled
                                            ? "text-primary/70 hover:text-primary"
                                            : "text-white/80 hover:text-white"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            {/* Language Switcher */}
                            <div className="relative">
                                <button
                                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                                    className={`flex items-center gap-1.5 px-2 py-1.5 text-[0.7rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 ${scrolled
                                            ? "text-primary/60 hover:text-primary"
                                            : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    <span>{localeLabels[locale]}</span>
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {langMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-28 bg-white border border-border-light shadow-lg overflow-hidden"
                                        >
                                            {Object.entries(localeLabels).map(([loc, label]) => (
                                                <button
                                                    key={loc}
                                                    onClick={() => switchLocale(loc)}
                                                    className={`w-full text-left px-4 py-2.5 text-[0.7rem] font-semibold tracking-[0.1em] uppercase transition-colors ${locale === loc
                                                            ? "bg-primary text-white"
                                                            : "text-primary/70 hover:bg-bg-alt hover:text-primary"
                                                        }`}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/kontakt"
                                className={`hidden lg:inline-flex items-center px-6 py-2.5 text-[0.7rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${scrolled
                                        ? "border border-primary text-primary hover:bg-primary hover:text-white"
                                        : "border border-white/50 text-white hover:bg-white/10 hover:border-white"
                                    }`}
                            >
                                {t("inquiry")}
                            </Link>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? "text-primary" : "text-white"
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu — Full screen overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-[#f7f4f0] flex flex-col"
                    >
                        {/* Close button */}
                        <div className="flex justify-end p-6">
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-primary p-2"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Nav items */}
                        <nav className="flex-1 flex flex-col items-center justify-center gap-2">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 text-primary heading-display text-3xl hover:text-accent transition-colors"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/kontakt"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="btn-primary"
                                >
                                    {t("inquiry")}
                                </Link>
                            </motion.div>
                        </nav>

                        {/* Language switch at bottom */}
                        <div className="flex justify-center gap-4 pb-10">
                            {Object.entries(localeLabels).map(([loc, label]) => (
                                <button
                                    key={loc}
                                    onClick={() => {
                                        switchLocale(loc);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-3 py-2 transition-colors ${locale === loc
                                            ? "text-accent"
                                            : "text-muted hover:text-primary"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
