import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { useExperience } from "./context/ExperienceContext";

import Landing from "./sections/Landing";
import System from "./sections/System";

export default function App() {
  const { mode } = useExperience();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen bg-[var(--bg)] text-[var(--text)]"
            >
              <Landing />
            </motion.main>
          }
        />

        <Route
          path="/system"
          element={
            <motion.main
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="min-h-screen"
            >
              <System />
            </motion.main>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
