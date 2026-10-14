"use client";

import { useEffect } from "react";

export default function DynamicTitle() {
  useEffect(() => {
    const titles = ["hop in !!", "i see u"];
    let index = 0;

    // Initial title
    document.title = titles[0];

    const interval = setInterval(() => {
      index = (index + 1) % titles.length;
      document.title = titles[index];
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
