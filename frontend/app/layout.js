
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const themeScript = `
  try {
    const theme = localStorage.getItem("AK AlgoTrack-theme");
    document.documentElement.classList.toggle(
      "light",
      theme === "light"
    );
  } catch {}
`;

export const metadata = {
  title: "AK AlgoTrack — DSA Studio",
  description: "A cinematic study desk for DSA preparation.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className={outfit.className}>
        <div className="ambient" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
