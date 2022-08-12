import { Button } from "@mui/material";
import { observer } from "mobx-react";

import { GridLayout } from "../components";
import { useStore } from "../context";

export const Cats = observer(() => {
  const { cats } = useStore();

  return (
    <GridLayout
      items={cats.map((cat) => {
        return {
          title: cat.name,
          image: cat.image,
          element: (
            <Button variant="contained" sx={{ maxWidth: "5rem" }}>
              Adopt
            </Button>
          ),
        };
      })}
    />
  );
});
