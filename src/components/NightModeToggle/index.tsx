import { Box, IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../../contexts/ThemeContextProvider";

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();
  const capitalizedMode = mode.charAt(0).toUpperCase() + mode.slice(1);

  return (
    <Box>
      <Tooltip title={`${capitalizedMode} Mode`}>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default NightModeToggle;
