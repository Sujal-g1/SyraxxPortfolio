import { useEffect, useRef, useState } from "react";

export default function BlockchainSpace({ mode }) {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let mouseX = 0;
    let mouseY = 0;

    const handleMove = (e) => {
      mouseX = (e.clientX / canvas.width - 0.5) * 2;
      mouseY = (e.clientY / canvas.height - 0.5) * 2;
      setActive(true); // wake once user interacts
    };

    window.addEventListener("mousemove", handleMove);

    const NODE_COUNT = 80;
    const nodes = Array.from({ length: NODE_COUNT }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random(),
      r: Math.random() * 1.6 + 0.6,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        const depth = n.z;
        const offsetX = mouseX * depth * 40;
        const offsetY = mouseY * depth * 40;

        ctx.beginPath();
        ctx.arc(
          n.x + offsetX,
          n.y + offsetY,
          n.r * (0.7 + depth),
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          mode === "hacker"
            ? `rgba(0,255,120,${n.opacity})`
            : `rgba(180,180,255,${n.opacity})`;

        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={`
        fixed inset-0 z-0 pointer-events-none
        transition-opacity duration-1000
        ${active ? "opacity-100" : "opacity-0"}
      `}
    />
  );
}
