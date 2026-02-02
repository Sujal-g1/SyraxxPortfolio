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

    // Cursor state (normalized)
    let mouseX = 0;
    let mouseY = 0;

    const handleMove = (e) => {
      mouseX = (e.clientX / canvas.width - 0.5) * 2;
      mouseY = (e.clientY / canvas.height - 0.5) * 2;
      setActive(true);
    };

    window.addEventListener("mousemove", handleMove);

    // ---------------- Nodes ----------------
    const NODE_COUNT = 150;
    const CONNECT_DISTANCE = 140;

    const nodes = Array.from({ length: NODE_COUNT }).map(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;

      return {
        x,
        y,
        baseX: x,
        baseY: y,
        z: Math.random(), // depth (0–1)
        r: Math.random() * 1.6 + 0.6,
        opacity: Math.random() * 0.4 + 0.2,
      };
    });

    // ---------------- Render Loop ----------------
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Convert normalized mouse to canvas space
      const cx = canvas.width * (mouseX * 0.5 + 0.5);
      const cy = canvas.height * (mouseY * 0.5 + 0.5);

      // ----------- Node interactions -----------
      nodes.forEach((n) => {
        const depth = n.z;

        // Cursor attraction
        const dx = cx - n.x;
        const dy = cy - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const attractionRadius = 180 + depth * 200;

        if (dist < attractionRadius) {
          const force = (1 - dist / attractionRadius) * 0.015 * depth;
          n.x += dx * force;
          n.y += dy * force;
        } else {
          n.x += (n.baseX - n.x) * 0.01;
          n.y += (n.baseY - n.y) * 0.01;
        }
      });

      // ----------- Connections (BLOCKCHAIN) -----------
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            const alpha = (1 - dist / CONNECT_DISTANCE) * 0.25;
            const depthAlpha = (a.z + b.z) * 0.5;

            ctx.strokeStyle =
              mode === "hacker"
                ? `rgba(0,255,120,${alpha * depthAlpha})`
                : `rgba(180,180,255,${alpha * depthAlpha})`;

            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ----------- Draw Nodes -----------
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
        ${active ? "opacity-80" : "opacity-0"}
      `}
    />
  );
}
