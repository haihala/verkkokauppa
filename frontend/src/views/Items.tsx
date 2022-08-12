import { Button } from "@mui/material";
import { observer } from "mobx-react";

import { GridLayout } from "../components";
import { useStore } from "../context";

export const Items = observer(() => {
  const { items } = useStore();

  return (
    <GridLayout
      items={items.map((item) => {
        return {
          title: item.name,
          image: item.image,
          element: (
            <div className="flex gap-3">
              <div className="my-auto">{item.price}€</div>
              <Button variant="contained">Add to cart</Button>
            </div>
          ),
        };
      })}
    />
  );
});
