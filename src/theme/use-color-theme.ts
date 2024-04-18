import { createTheme, PaletteMode } from "@mui/material";
import React from "react";
import { getDesignTokens } from "./theme";

export const useColorTheme = () => {
  const [mode, setMode] = React.useState<PaletteMode>(() => {
    // Initialize mode from local storage if available, otherwise default to "light"
    const storedMode = localStorage.getItem("colorMode");
    return storedMode && (storedMode === "light" || storedMode === "dark")
      ? storedMode
      : "light";
  });

  // Update local storage when mode changes
  React.useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const modifiedTheme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
