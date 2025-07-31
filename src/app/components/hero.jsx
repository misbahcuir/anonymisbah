"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BlurText from "../../../ReactBits/BlurText/BlurText";
import TextType from "../../../ReactBits/TextType/TextType";
import toast from "react-hot-toast";
import {
  Mail,
  User,
  MessageSquare,
  FileText,
  Lock,
  MessageCircle,
  File,
  Users,
} from "@deemlol/next-icons";

// Floating Icons Component
const FloatingIcon = ({ icon, delay, duration, x, y, left, top }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0, 0.6, 0],
      y: [20, -20, 20],
      x: [0, x, 0],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    className="absolute text-amber-600 pointer-events-none"
    style={{
      left: left,
      top: top,
    }}
  >
    {icon}
  </motion.div>
);

const Hero = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    setIsSubmitting(true);
    toast.loading("Sending your quote...", { id: "quote-submission" });

    const formData = new FormData(e.target);
    const question = formData.get("quote");

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Quote submitted successfully!", {
          id: "quote-submission",
        });

        e.target.reset(); // Reset the form after successful submission
      } else {
        toast.error("Quote submission failed!", { id: "quote-submission" });
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Quote submission failed!", { id: "quote-submission" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-8 items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Floating Icons */}
      <FloatingIcon
        icon={<Mail size={68} color="#d97706" />}
        delay={0}
        duration={4}
        x={10}
        left="15%"
        top="10%"
      />
      <FloatingIcon
        icon={<User size={68} color="#d97706" />}
        delay={0.5}
        duration={5}
        x={-15}
        left="25%"
        top="15%"
      />
      <FloatingIcon
        icon={<MessageSquare size={68} color="#d97706" />}
        delay={1}
        duration={4.5}
        x={20}
        left="35%"
        top="8%"
      />
      <FloatingIcon
        icon={<FileText size={68} color="#d97706" />}
        delay={1.5}
        duration={5.5}
        x={-10}
        left="45%"
        top="12%"
      />
      <FloatingIcon
        icon={<Lock size={68} color="#d97706" />}
        delay={2}
        duration={4}
        x={15}
        left="55%"
        top="18%"
      />
      <FloatingIcon
        icon={<MessageCircle size={68} color="#d97706" />}
        delay={2.5}
        duration={5}
        x={-20}
        left="65%"
        top="10%"
      />
      <FloatingIcon
        icon={<File size={68} color="#d97706" />}
        delay={3}
        duration={4.5}
        x={12}
        left="75%"
        top="15%"
      />
      <FloatingIcon
        icon={<Users size={68} color="#d97706" />}
        delay={3.5}
        duration={5.5}
        x={-18}
        left="85%"
        top="12%"
      />

      <BlurText
        text={`"Write a mystery quote for Misbah"`}
        delay={150}
        animateBy="words"
        direction="top"
        className="text-5xl md:text-6xl font-semibold text-center text-white"
      />
      <TextType
        text={
          "Share your thoughts anonymously. Express yourself freely. Let your words inspire others. I'll reply to your quotes below with thoughtful responses."
        }
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
      />

      <motion.div
        initial={{ filter: "blur(20px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl relative z-10"
      >
        <form onSubmit={handleSubmit}>
          <textarea
            name="quote"
            required
            style={{
              backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)
      `,
              backgroundSize: "8px 8px, 32px 32px, 32px 32px",
            }}
            className="bg-[#faf9f6] text-black w-full  h-72 p-4 border rounded-lg shadow-sm focus:outline-none font-abu-akkas text-xl"
            placeholder="Write your quote here..."
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-lg shadow-md transition-colors w-full cursor-pointer ${
              isSubmitting
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-amber-950 text-white hover:bg-[#3c0a0a]"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              "Send Quote"
            )}
          </button>
        </form>
      </motion.div>

      {/* Scroll Down Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-amber-500"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
        <p className="text-amber-400 text-sm font-medium">
          Scroll down to read the replies
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;
