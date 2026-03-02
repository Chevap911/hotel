import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });
    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
            type: "website",
            locale: locale,
            siteName: "Villa Antonio",
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "hr" | "en" | "de" | "it")) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="font-body bg-cream text-dark antialiased">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
