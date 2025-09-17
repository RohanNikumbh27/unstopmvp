"use client";

import React, { useEffect, useState } from "react";

/**
 * Renders a blocking full‑screen message when the viewport is below the required size.
 *
 * Props:
 * - minWidth  (number)  : minimum supported width in px (default 768)
 * - minHeight (number)  : minimum supported height in px (default 600)
 * - message   (string)  : custom message line 1
 * - subMessage(string)  : custom secondary text
 * - showDimensions (bool): include current dimensions in the notice (default true)
 * - children  (ReactNode): optional content to render when viewport is supported
 *
 * Usage:
 * <UnsupportedViewPort minWidth={768} minHeight={600}>
 *   <YourAppContent/>
 * </UnsupportedViewPort>
 */
export default function UnsupportedViewPort({
  minWidth = 768,
  minHeight = 600,
  message = "Unsupported Viewport",
  subMessage = "Please use a larger screen or rotate your device to continue.",
  showDimensions = true,
  children,
}) {
  const [size, setSize] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : minWidth,
    h: typeof window !== "undefined" ? window.innerHeight : minHeight,
  });

  const unsupported = size.w < minWidth || size.h < minHeight;

  useEffect(() => {
    const handleResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    // handle orientation changes (some browsers only fire resize, but safe)
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  if (!unsupported) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white px-6 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {/* Simple icon (inline SVG) */}
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-[#1C1B1F]">{message}</h1>
        <p className="mt-3 text-sm text-gray-600">{subMessage}</p>
        {showDimensions && (
          <p className="mt-2 text-xs text-gray-500">
            Current: {size.w} × {size.h}px (need at least {minWidth} ×{" "}
            {minHeight}px)
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            // re-check (e.g., after rotating)
            setSize({ w: window.innerWidth, h: window.innerHeight });
          }}
          className="primary-btn mt-6 px-6 py-3 rounded-xl"
        >
          Recheck
        </button>
      </div>
    </div>
  );
}
