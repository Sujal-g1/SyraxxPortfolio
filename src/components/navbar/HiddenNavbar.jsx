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

  // Smooth system-style navigation
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setOpen(false);

    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* ===== Global System Trigger (Hero / Anywhere) ===== */}
      <div
        className="fixed bottom-6 right-6 z-30"
        onMouseDown={startPress}
        onMouseUp={endPress}
        onClick={() => setOpen(true)}
      >
        <motion.div
          whileHover={{ scale: 1.15, opacity: 0.35 }}
          animate={{ opacity: 5 }}
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

      {/* ===== System Overlay ===== */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-2xl"
          >
            {/* ===== Overlay Close Control (Mobile-first) ===== */}
            <div
              className="absolute bottom-6 right-6 z-50"
              onClick={() => setOpen(false)}
            >
              <motion.div
                whileHover={{ scale: 1.15, opacity: 0.4 }}
                animate={{ opacity: 5 }}
                transition={{ duration: 0.4 }}
                className={`
                  w-12 h-12 rounded-full cursor-pointer
                  ${mode === "hacker"
                    ? "bg-green-400/40"
                    : "bg-[var(--primary)]/25"}
                  backdrop-blur-md
                `}
              />
            </div>

            {/* ===== Navigation Items ===== */}
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 },
                },
              }}
              className="space-y-8 text-center"
            >
              {[
                { label: "Home", id: "home" },
                { label: "Projects", id: "projects" },
                { label: "Tech Stack", id: "tech" },
                { label: "Playground", id: "playground" },
                { label: "Contact", id: "contact" },
              ].map(({ label, id }) => (
                <motion.li
                  key={id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  whileHover={{ scale: 1.1, letterSpacing: "0.2em" }}
                  className={`text-3xl md:text-5xl font-bold cursor-pointer ${
                    mode === "hacker"
                      ? "text-green-400"
                      : "text-[var(--primary)]"
                  }`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </motion.li>
              ))}
            </motion.ul>

            {/* System hint */}
            <p className="absolute bottom-10 text-xs opacity-30 tracking-widest">
              · SYSTEM NAVIGATION · 
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
