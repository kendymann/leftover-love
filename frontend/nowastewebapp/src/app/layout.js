import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Leftover Love - Sharing More Than Just Food",
  description: "Connect restaurants with surplus food to charities and local food banks. Reduce food waste while helping communities in need.",
  keywords: "food waste, charity, restaurants, donations, sustainability, community",
  author: "Leftover Love Team",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/Leftover Love Logo Design.png",
    shortcut: "/Leftover Love Logo Design.png",
    apple: "/Leftover Love Logo Design.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={playfairDisplay.variable}>
        {children}
      </body>
    </html>
  );
}
