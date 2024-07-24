import { useTheme } from "next-themes";
import { useState } from "react";

const ThemeChanger = () => {
  const { setTheme, theme } = useTheme();
  const [myTheme, setMyTheme] = useState(true);

  const handleThemeToggle = () => {
    myTheme ? setTheme("light") : setTheme("dark");
    setMyTheme(!myTheme);
  };

  return (
    <div>
      <button onClick={handleThemeToggle}>Light Mode</button>
    </div>
  );
};
