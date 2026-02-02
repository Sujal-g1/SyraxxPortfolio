import { createContext, useContext, useState } from "react";


const ExperienceContext = createContext();

export const ExperienceProvider = ({ children }) => {
  const [mode, setMode] = useState("default");

  const setExperience = (newMode) => {
    setMode(newMode);
  };

  return (
    <ExperienceContext.Provider value={{ mode, setExperience }}>
      <div data-mode={mode}>{children}
      </div>
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => useContext(ExperienceContext);
