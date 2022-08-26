import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useProducts } from "../utils/customHooks";

import { Cart } from "./Cart";

export const TopBar = (props: ReturnType<typeof useProducts>) => {
  const links = [
    { to: "/", text: "Home" },
    { to: "cats", text: "Cats" },
    { to: "products", text: "Products" },
  ];

  return (
    <AppBar position="static">
      <div className="flex justify-between">
        <Toolbar variant="dense">
          {links.map(({ text, to }, index) => (
            <Typography
              key={index}
              variant="h6"
              color="inherit"
              className="px-3"
            >
              <Link to={to}>{text}</Link>
            </Typography>
          ))}
        </Toolbar>
        <Cart {...props} />
      </div>
    </AppBar>
  );
};
