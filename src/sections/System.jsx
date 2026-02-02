import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import confetti from 'canvas-confetti';
import {  Zap, Ghost, Box, RefreshCw, Activity, Terminal,Cpu, Rocket, Eye, ShieldAlert, Binary, Layers,
   Dna, Radio, Target, Search} from 'lucide-react';

// 1. --- 3D Fluid Core ---
const FluidCore = ({ color }) => {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.z = state.clock.getElapsedTime() * 0.5;
  });
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 128, 128]} scale={2.2}>
        <MeshDistortMaterial color={color} speed={4} distort={0.5} radius={1} />
      </Sphere>
    </Float>
  );
};

const System = () => {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [mode, setMode] = useState('CYBER'); // CYBER, GHOST, OVERHEAT, NEON
  const [logs, setLogs] = useState(["SYSTEM_READY"]);
  
  // Magnetic Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const sY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // 2. --- Hyper Loading Logic ---
  useEffect(() => {
    const int = setInterval(() => {
      setPercent(p => {
        if (p >= 100) {
          clearInterval(int);
          setTimeout(() => setLoading(false), 1000);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(int);
  }, []);

  const addLog = (msg) => setLogs(prev => [msg, ...prev.slice(0, 5)]);

  // Hidden Button Functions
  const triggerChaos = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00f2ff', '#ff0055'] });
    addLog("CHAOS_PROTOCOL_INIT");
  };

  const toggleGlitch = () => {
    setMode('OVERHEAT');
    setTimeout(() => setMode('CYBER'), 1500);
    addLog("CORE_TEMPERATURE_CRITICAL");
  };

  return (
    <div 
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
      className={`min-h-screen font-mono overflow-hidden transition-colors duration-700
      ${mode === 'CYBER' ? 'bg-[#020204] text-cyan-400' : ''}
      ${mode === 'GHOST' ? 'bg-[#0a0a0a] text-white/20' : ''}
      ${mode === 'OVERHEAT' ? 'bg-[#1a0505] text-red-500' : ''}
    `}>
      
      {/* 3. --- CINEMATIC ENTRANCE --- */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ scale: 2, opacity: 0, filter: 'blur(20px)' }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ width: 0 }} animate={{ width: "300px" }}
              className="h-[1px] bg-cyan-500 mb-4 shadow-[0_0_15px_#00f2ff]" 
            />
            <div className="text-[10px] tracking-[1em] font-black animate-pulse">
              SYNCING_SYRAXX_NEURAL_LINK_{percent}%
            </div>
            <div className="absolute bottom-10 left-10 text-[8px] opacity-30">
              {logs[0]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. --- 3D BACKGROUND --- */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <Canvas>
          <Suspense fallback={null}>
            <FluidCore color={mode === 'OVERHEAT' ? '#ff0000' : '#00f2ff'} />
          </Suspense>
        </Canvas>
      </div>

      {/* 5. --- BENTO GRID LAYOUT --- */}
      <main className="relative z-10 p-6 grid grid-cols-12 grid-rows-6 gap-4 h-screen">
        
        {/* TOP NAV / INFO */}
        <motion.div 
          initial={{ y: -100 }} animate={{ y: 0 }}
          className="col-span-8 row-span-1 border border-current/20 bg-current/5 backdrop-blur-md flex items-center px-8 justify-between rounded-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-current rounded-full flex items-center justify-center animate-spin-slow">
              <Dna size={20} />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter">SYRAXX.OS_V5</h1>
          </div>
          <div className="flex gap-10 text-[10px] font-black opacity-50">
            <span>PING: 12MS</span>
            <span>MEM: 1.2GB</span>
            <span>LOC: 127.0.0.1</span>
          </div>
        </motion.div>

        {/* HIDDEN BUTTON 1: THE SCANNER */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          onClick={triggerChaos}
          className="col-span-4 row-span-1 border border-current/20 bg-current/5 rounded-2xl flex items-center justify-center cursor-pointer group"
        >
          <Target size={24} className="group-hover:rotate-90 transition-transform" />
          <span className="ml-4 text-[10px] font-bold tracking-widest hidden group-hover:block">INITIALIZE_CHAOS</span>
        </motion.div>

        {/* TECH STACK  */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="col-span-3 row-span-4 border border-current/20 bg-current/5 p-6 rounded-2xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[10px] opacity-40 uppercase tracking-[0.3em]">
              <Layers size={14} /> Augmentations
            </div>
            {['React/Next', 'Three.js', 'Solidity', 'Rust'].map((tech, i) => (
              <motion.div 
                key={tech}
                whileHover={{ x: 10, color: '#fff' }}
                className="text-xl font-black italic cursor-default border-b border-current/10 pb-2"
              >
                0{i+1} / {tech}
              </motion.div>
            ))}
          </div>
          <div className="p-4 bg-current/10 rounded-xl text-[9px] font-bold">
            <Terminal size={14} className="mb-2"/> {logs[0]}
          </div>
        </motion.div>

        {/* HERO SECTION */}
        <motion.div 
          className="col-span-6 row-span-4 relative flex flex-col justify-center items-center text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-[400px] h-[400px] border border-current/10 rounded-full border-dashed"
          />
          <h2 className="text-[12vw] font-black italic leading-none tracking-tighter mix-blend-difference">SYRAXX</h2>
          <p className="text-[10px] tracking-[1.5em] opacity-40 mt-4 uppercase">Architecting Digital Dimensions</p>
          
          {/* HIDDEN BUTTON 2: THE "EYE" */}
          <button 
            onClick={() => setMode(mode === 'GHOST' ? 'CYBER' : 'GHOST')}
            className="mt-8 p-4 rounded-full border border-current/20 hover:bg-current hover:text-black transition-all"
          >
            <Eye size={20} />
          </button>
        </motion.div>

        {/* PROJECT CARD */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="col-span-3 row-span-3 border border-current/20 bg-white/5 backdrop-blur-3xl rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <Box size={40} className="group-hover:scale-110 transition-transform"/>
              <span className="text-[10px] font-bold py-1 px-3 border border-current rounded-full">LIVE</span>
            </div>
            <div>
              <p className="text-2xl font-black italic mb-2 tracking-tighter uppercase">Nexus_Swap</p>
              <p className="text-[10px] opacity-50 uppercase tracking-widest">High-Speed DEX / 2024</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-current/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* DATA LOG BENTO */}
        <div className="col-span-3 row-span-2 border border-current/10 bg-black/40 p-6 rounded-2xl">
          <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 mb-4 uppercase">
            <Activity size={14} /> Live_Feed
          </div>
          <div className="space-y-2">
            {logs.map((log, i) => (
              <div key={i} className="text-[8px] opacity-40 font-mono flex gap-2">
                <span className="text-current">{`[${100-i*5}%]`}</span> {log}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER NAV */}
        <motion.footer 
          initial={{ y: 100 }} animate={{ y: 0 }}
          className="col-span-9 row-span-1 border border-current/20 bg-current/5 backdrop-blur-md rounded-2xl flex items-center px-10 gap-12"
        >
          {['Vault', 'Mission', 'Connect'].map((link) => (
            <motion.a 
              key={link} href="#" 
              whileHover={{ scale: 1.1, x: 5 }}
              className="text-xl font-black italic tracking-tighter uppercase hover:text-white transition-all"
            >
              {link}
            </motion.a>
          ))}
          
          {/* HIDDEN BUTTON 3: THE RADIO */}
          <button 
            onClick={toggleGlitch}
            className="ml-auto w-12 h-12 border border-current/20 rounded-xl flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all"
          >
            <Radio size={20} />
          </button>
        </motion.footer>

        {/* HIDDEN BUTTON 4: SEARCH */}
        <div 
          onClick={() => addLog("SEARCHING_FOR_EASTER_EGGS...")}
          className="col-span-3 row-span-1 border border-current/20 bg-current/5 rounded-2xl flex items-center justify-center cursor-help group"
        >
          <Search size={20} className="group-hover:scale-150 transition-transform opacity-20"/>
        </div>

      </main>

      {/* 6. --- CUSTOM MOUSE TRAILER --- */}
      <motion.div 
        style={{ left: sX, top: sY }}
        className="fixed w-4 h-4 bg-current rounded-full pointer-events-none z-[100] mix-blend-difference" 
      />

      <style jsx>{`
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default System;