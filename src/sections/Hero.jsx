import { motion , AnimatePresence } from "framer-motion";
import { useExperience } from "../context/ExperienceContext";
import { useState, useEffect,} from "react";
import BlockchainSpace from "../components/background/BlockchainSpace";



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
    <section id="home" className="h-screen flex flex-col items-center justify-center relative overflow-hidden select-none">

        <BlockchainSpace mode={mode} />

      {/* Name Animation */}
      <div className="flex mb-10 ">
        {name.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.12, duration: 2 }}
            whileHover={{ 
            y: -20, 
            scale: 1.2,
             color: "var(--accent)", // Change color on hover
                textShadow: "0px 0px 20px var(--primary)" 
            }}
           className={` text-7xl md:text-9xl font-extrabold cursor-pointer bg-clip-text text-transparent ${ mode === "hacker"
      ? "bg-gradient-to-br from-green-300 via-green-500 to-emerald-200 drop-shadow-[0_0_25px_rgba(0,255,120,0.6)]"
      : "bg-gradient-to-br from-[var(--primary)] via-[var(--accent)] to-white drop-shadow-[0_0_20px_rgba(150,150,255,0.35)]"
         }`}
            onClick={() => index === 0 && handleSecretClick()}
          >
            {letter}
          </motion.span>
        ))}
      </div>

     <div className="relative flex flex-col items-center justify-center h-40 w-full"> 
  {subtitles.map((text, index) => {
    const distance = index - subtitleIndex;
    
    return (
      <motion.p
        key={text}
        initial={false}
        animate={{
          // Controls vertical spacing
          y: distance * 40, 
          opacity: distance === 0 ? 1 : 0.3,
          scale: distance === 0 ? 1.1 : 0.85,
          filter: distance === 0 ? "blur(0px)" : "blur(1px)",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
        /* whitespace-nowrap is the key fix here */
        className="absolute whitespace-nowrap text-sm md:text-lg tracking-[0.3em] uppercase font-mono transition-colors duration-300"
        style={{
          color: distance === 0 ? "var(--primary)" : "gray",
        }}
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
