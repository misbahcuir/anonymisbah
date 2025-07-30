import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "AnonyMisbah | Write Mystery Quotes to Misbah",
  description: "Developed by Misbah Rumman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className}`}>
        <div className="min-h-screen w-full relative">
          {/* Crimson Depth */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
            }}
          />
          <div className="relative z-10 ">
            <Toaster></Toaster> {children} <Footer></Footer>
          </div>
        </div>
      </body>
    </html>
  );
}
