import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useExperience } from "../context/ExperienceContext";

const PROJECTS = [
  {
    id: "mobizee",
    title: "Mobizee",
    subtitle: "Connected Bus Network",
    description:
      "A smart mobility platform that connects rural and urban bus networks with live routing, seat booking, safety features, and real-time decision making.",
    tech: ["React", "Node.js", "MongoDB", "Blockchain"],
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    id: "panic",
    title: "Panic Button System",
    subtitle: "Real-time Emergency Alerts",
    description:
      "An emergency response system with instant alerts, email notifications, QR verification, and admin monitoring dashboards.",
    tech: ["React", "Express", "MongoDB"],
    links: {
      github: "#",
      live: "#",
    },
  },
];

export default function Projects() {
  const { mode } = useExperience();
  const [active, setActive] = useState(null);

  return (
    <section
      id="projects"
      className="min-h-screen px-6 md:px-20 py-24 relative"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold mb-16"
      >
        Projects
      </motion.h2>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            layoutId={project.id}
            onClick={() => setActive(project)}
            whileHover={{ scale: 1.03 }}
            className={`
              cursor-pointer rounded-2xl p-6 md:p-8
              ${
                mode === "hacker"
                  ? "bg-green-500/10 border border-green-400/30"
                  : "bg-white/5 border border-white/10"
              }
            `}
          >
            <h3 className="text-2xl font-semibold mb-1">
              {project.title}
            </h3>
            <p className="opacity-60">{project.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* ===== FULLSCREEN TAKEOVER ===== */}
      <AnimatePresence>
        {active && (
          <>
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setActive(null)}
            />

            {/* Expanded Project */}
            <motion.div
              layoutId={active.id}
              className={`
                fixed inset-6 md:inset-16 z-50
                rounded-3xl p-8 md:p-12 overflow-y-auto
                ${
                  mode === "hacker"
                    ? "bg-black border border-green-400/40"
                    : "bg-zinc-900 border border-white/10"
                }
              `}
            >
              {/* Close */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-6 right-6 opacity-60 hover:opacity-100"
              >
                ✕
              </button>

              {/* Content */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                {active.title}
              </motion.h3>

              <p className="opacity-70 mb-6">
                {active.subtitle}
              </p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl text-base md:text-lg opacity-90 mb-8"
              >
                {active.description}
              </motion.p>

              {/* Tech */}
              <div className="flex flex-wrap gap-3 mb-10">
                {active.tech.map((t) => (
                  <span
                    key={t}
                    className={`
                      px-4 py-2 rounded-full text-sm
                      ${
                        mode === "hacker"
                          ? "bg-green-400/20 text-green-300"
                          : "bg-white/10"
                      }
                    `}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-6">
                <a
                  href={active.links.github}
                  target="_blank"
                  className="underline opacity-80 hover:opacity-100"
                >
                  GitHub
                </a>
                <a
                  href={active.links.live}
                  target="_blank"
                  className="underline opacity-80 hover:opacity-100"
                >
                  Live Demo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
