import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "./context/ExperienceContext";
import HiddenNavbar from "./components/navbar/HiddenNavbar";
import Projects from "./sections/Projects";



import Hero from "./sections/Hero"

export default function App() {
  const { mode } = useExperience();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-[var(--bg)] text-[var(--text)] "
      >
        <HiddenNavbar />
       <Hero />
       {/* <Projects /> */}
      </motion.main>
    </AnimatePresence>
  );
}
