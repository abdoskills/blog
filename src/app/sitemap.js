export default function sitemap() {
  const baseUrl = "https://www.abdoskills.me";

  const staticRoutes = [
    "",
    "/ctfs",
    "/labs",
    "/about",
    "/cv",
    "/posts/kaspersky-ping-pong-show",
    "/posts/kaspersky-ryan-guzling",
    "/posts/kaspersky-time-to-install-arch",
    "/posts/the-thrushes",
    "/posts/search-dude",
    "/posts/sensor-confession",
    "/posts/nightshade-vendor",
    "/posts/phobos-ransomware-analysis",
    "/posts/picoctf-c0rrupt",
    "/posts/picoctf-extensions",
    "/posts/picoctf-investigative-reversing-0",
    "/posts/picoctf-investigative-reversing-1",
    "/posts/picoctf-investigative-reversing-2",
    "/posts/picoctf-investigative-reversing-3",
    "/posts/picoctf-like1000",
    "/posts/picoctf-m00nwalk",
    "/posts/picoctf-shark-on-wire-1",
    "/posts/picoctf-shark-on-wire-2",
    "/posts/picoctf-so-meta",
    "/posts/picoctf-what-lies-within",
    "/posts/picoctf-whitepages",
    "/posts/crypto-suite",
    "/posts/cascaded-fallacy",
    "/posts/sol-net",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/posts/") ? 0.8 : 0.9,
  }));
}
