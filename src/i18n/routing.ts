import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["hr", "en", "de", "it"],
    defaultLocale: "hr",
    pathnames: {
        "/": "/",
        "/sobe": {
            hr: "/sobe",
            en: "/rooms",
            de: "/zimmer",
            it: "/camere",
        },
        "/sobe/[slug]": {
            hr: "/sobe/[slug]",
            en: "/rooms/[slug]",
            de: "/zimmer/[slug]",
            it: "/camere/[slug]",
        },
        "/destinacija": {
            hr: "/destinacija",
            en: "/destination",
            de: "/reiseziel",
            it: "/destinazione",
        },
        "/galerija": {
            hr: "/galerija",
            en: "/gallery",
            de: "/galerie",
            it: "/galleria",
        },
        "/kontakt": {
            hr: "/kontakt",
            en: "/contact",
            de: "/kontakt",
            it: "/contatto",
        },
        "/faq": "/faq",
    },
});

export type Pathnames = keyof typeof routing.pathnames;
