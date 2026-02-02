import { motion } from "framer-motion";
import { useExperience } from "../context/ExperienceContext";
import { useState, useEffect } from "react";

const name = "SYRAXX".split("");

export default function Hero() {
  const { mode, setExperience } = useExperience();
  const [subtitleIndex, setSubtitleIndex] = useState(0);
const [mouse, setMouse] = useState({ x: 0, y: 0 });


  const subtitles = [
    "Frontend Developer",
    "Blockchain Developer",
    "Experience Engineer",
  ];

  // Ladder subtitle loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Toggle hacker mode
  const handleSecretClick = () => {
    setExperience(mode === "hacker" ? "default" : "hacker");
  };


  useEffect(() => {
  const handleMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMouse({ x, y });
  };

  window.addEventListener("mousemove", handleMove);
  return () => window.removeEventListener("mousemove", handleMove);
}, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden select-none">

      {/* Name Animation */}
      <div className="flex mb-10">
        {name.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.12, duration: 0.6 }}
            whileHover={{ y: -12, scale: 1.15 }}
            className="text-7xl md:text-9xl font-extrabold text-[var(--primary)] cursor-pointer"
            onClick={() => index === 0 && handleSecretClick()}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Ladder Subtitles */}
      <div className="flex flex-col gap-3 h-24">
        {subtitles.map((text, index) => {
          const isActive = index === subtitleIndex;

          return (
            <motion.p
              key={text}
              animate={{
                opacity: isActive ? 0.9 : 0.25,
                y: isActive ? 0 : 12,
                scale: isActive ? 1 : 0.95,
              }}
              transition={{ duration: 0.4 }}
              className="text-sm md:text-base tracking-widest uppercase"
            >
              {text}
            </motion.p>
          );
        })}
      </div>

      {/* Hidden hint (temporary) */}
      <p className="absolute bottom-10 opacity-20 text-xs">
        There are secrets here.
      </p>
    </section>
  );
}
