import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useExperience } from "../../context/ExperienceContext";

export default function HiddenNavbar() {
  const { mode } = useExperience();
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  // Keyboard: Shift + Space
  useEffect(() => {
    const handleKey = (e) => {
      if (e.shiftKey && e.code === "Space") {
        setOpen((v) => !v);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Long press handlers
  const startPress = () => {
    timerRef.current = setTimeout(() => {
      setOpen(true);
    }, 1200);
  };

  const endPress = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <>
      {/* Long-press listener (small, non-blocking) */}
    <div
  className="fixed bottom-6 right-6 z-30"
  onMouseDown={startPress}
  onMouseUp={endPress}
  onClick={() => setOpen(true)}
>
  <motion.div
    whileHover={{ scale: 1.15, opacity: 0.35 }}
    animate={{ opacity: 0.2 }}
    transition={{ duration: 0.4 }}
    className={`
      w-10 h-10 rounded-full cursor-pointer
      ${mode === "hacker"
        ? "bg-green-400/30"
        : "bg-[var(--primary)]/20"}
      backdrop-blur-sm
    `}
  />
</div>


      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-xl"
          >
            <ul className="space-y-8 text-center">
              {["Home", "Projects", "Tech Stack", "Playground", "Contact"].map(
                (item) => (
                  <motion.li
                    key={item}
                    whileHover={{ scale: 1.1 }}
                    className={`text-3xl md:text-5xl font-bold cursor-pointer ${
                      mode === "hacker"
                        ? "text-green-400"
                        : "text-[var(--primary)]"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </motion.li>
                )
              )}
            </ul>

            <p className="absolute bottom-10 text-xs opacity-30">
              Shift + Space to close
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
