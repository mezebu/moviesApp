import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useMatch, useResolvedPath, NavLink } from "react-router-dom";
import NightModeToggle from "../NightModeToggle";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import UpcomingRoundedIcon from "@mui/icons-material/UpcomingRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import { Link } from "@mui/material";
import { green } from "@mui/material/colors";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

export default function AppDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const menuOptions = [
    { label: "Home", path: "/", icon: <HomeRoundedIcon /> },
    {
      label: "Upcoming",
      path: "/movies/upcoming",
      icon: <UpcomingRoundedIcon />,
    },
    {
      label: "Favorites",
      path: "/movies/favourites",
      icon: <FavoriteRoundedIcon />,
    },
    {
      label: "Popular Movies",
      path: "/movies/popular",
      icon: <LiveTvRoundedIcon />,
    },
    { label: "Tv Shows", path: "/movies/tv", icon: <LiveTvRoundedIcon /> },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          TMDB Client
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ m: 1 }}>
        {menuOptions.map((link) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const resolved = useResolvedPath(link.path);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const match = useMatch({ path: resolved.pathname, end: true });

          return (
            <Link
              component={NavLink}
              key={link.label}
              to={link.path}
              underline="none"
              color="inherit"
            >
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    backgroundColor: match ? green[200] : "inherit",
                  }}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: { md: "flex" } }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <NightModeToggle />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
