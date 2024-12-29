import { useEffect } from "react";
import { Child } from "./Child";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    setIsDarkMode((d) => !d);
  }

  useEffect(() => {
    document.body.style.background = isDarkMode ? "#333" : "white";
    document.body.style.color = isDarkMode ? "white" : "#333";
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <Child />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
        consequuntur at dicta ex quos dolor maxime quibusdam laboriosam itaque!
        Repellendus, excepturi officia impedit, animi voluptas magni adipisci
        cumque exercitationem doloribus saepe corporis dicta ad, ullam tempora
        molestiae quia vero. Fugit voluptatem eius autem amet perspiciatis
        laudantium impedit animi odit dolore.
      </p>
    </ThemeContext.Provider>
  );
}

export default App;
