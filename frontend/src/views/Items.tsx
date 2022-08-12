import { Button } from "@mui/material";
import { observer } from "mobx-react";

import { GridLayout } from "../components";
import { useStore } from "../context";

export const Items = observer(() => {
  const store = useStore();

  return (
    <GridLayout
      items={store.items.map((item) => {
        return {
          title: item.name,
          image: item.image,
          element: (
            <div className="flex gap-3">
              <div className="my-auto">{item.price}€</div>
              <Button
                variant="contained"
                onClick={() => store.addToCart(item.id)}
              >
                Add to cart
              </Button>
            </div>
          ),
        };
      })}
    />
  );
});
