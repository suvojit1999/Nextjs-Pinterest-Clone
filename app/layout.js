import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/components/header'
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pinterest - India",
  description: "Discover recipes, home ideas, style inspiration and other ideas to try.",
  // icon: 'https://s.pinimg.com/webapp/logo_transparent_144x144-3da7a67b.png'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
