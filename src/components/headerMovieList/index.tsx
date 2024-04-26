import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    padding: 2,
    justifyContent: "center",
    marginBottom: 1,
  },
};

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const title = props.title;

  return (
    <Paper variant="outlined" elevation={0} sx={styles.root}>
      <Typography fontWeight="bold" variant="h4" component="h3">
        {title}
      </Typography>
    </Paper>
  );
};

export default Header;
