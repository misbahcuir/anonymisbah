"use client";
import React from "react";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        toast.success("Quote submitted successfully!");

        // Show email status if available
        if (data.emailSent) {
          toast.success("Email notification sent!");
        } else if (data.emailError) {
          console.warn("Email notification failed:", data.emailError);
          // Don't show error toast to user since quote was saved successfully
        }

        e.target.reset(); // Reset the form after successful submission
      } else {
        toast.error("Quote submission failed!");
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast.error("Quote submission failed!");
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
        className="text-5xl md:text-6xl font-semibold text-center"
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
            className="bg-amber-950 text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#3c0a0a] transition-colors w-full  cursor-pointer"
          >
            Send Quote{" "}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Hero;
