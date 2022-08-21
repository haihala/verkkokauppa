import { Button } from "@mui/material";

import { GridLayout } from "../components";
import { Cat } from "../utils/models";

type Props = {
  cats: Cat[];
  adopt: (id: string) => void;
};

export const Cats = ({ cats, adopt }: Props) => {
  return (
    <GridLayout
      items={cats.map((cat) => {
        return {
          title: cat.name,
          image: cat.image,
          element: (
            <Button
              variant="contained"
              sx={{ maxWidth: "5rem" }}
              onClick={() => adopt(cat.id)}
            >
              Adopt
            </Button>
          ),
        };
      })}
    />
  );
};
