// import i18next from "i18next";
// import { z } from "zod";
// import { zodI18nMap } from "zod-i18n-map";
// import resourcesToBackend from "i18next-resources-to-backend";

// // function to activate translation for zod
// export async function initZodI18n(lng: string) {
//   await i18next
//     .use(
//       resourcesToBackend(
//         (lng: string, ns: string) => import(`../i18n/locales/${lng}/${ns}.json`)
//       )
//     )
//     .init({
//       lng,
//       fallbackLng: "en",
//       ns: ["zod"],
//       defaultNS: "zod"
//     });

//   z.setErrorMap(zodI18nMap);
// }
