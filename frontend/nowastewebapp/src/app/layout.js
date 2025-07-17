import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "Leftover Love - Sharing More Than Just Food",
  description: "Connect restaurants with surplus food to charities and local food banks. Reduce food waste while helping communities in need.",
  keywords: "food waste, charity, restaurants, donations, sustainability, community",
  author: "Leftover Love Team",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        {children}
      </body>
    </html>
  );
}
