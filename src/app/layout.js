import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/server/bootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cancer Care",
  description: "Healthcare cancer demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen w-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://pagedone.io/asset/uploads/1702362010.png')" }}
        >
          <div className="min-h-screen w-full bg-white/70 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto p-6">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}