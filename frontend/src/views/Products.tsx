import { Button } from "@mui/material";

import { GridLayout } from "../components";
import { Product } from "../utils/models";

type Props = {
  products: Product[];
  addToCart: (id: string) => void;
};

export const Products = ({ products, addToCart }: Props) => {
  return (
    <GridLayout
      items={products.map((item) => {
        return {
          title: item.name,
          image: item.image,
          element: (
            <div className="flex gap-3">
              <div className="my-auto">{item.price}€</div>
              <Button variant="contained" onClick={() => addToCart(item.id)}>
                Add to cart
              </Button>
            </div>
          ),
        };
      })}
    />
  );
};
