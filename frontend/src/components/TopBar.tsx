import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const TopBar = () => {
  const links = [
    { to: "/", text: "Home" },
    { to: "cats", text: "Cats" },
    { to: "items", text: "Items" },
  ];

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        {links.map(({ text, to }, index) => (
          <Typography key={index} variant="h6" color="inherit" className="px-3">
            <Link to={to}>{text}</Link>
          </Typography>
        ))}
      </Toolbar>
    </AppBar>
  );
};
