import { Grid } from "@mui/material";

import { CardProps, ItemCard } from "../components";

type Props = {
  items: CardProps[];
};

export const GridLayout = ({ items }: Props) => {
  return (
    <Grid container>
      {items.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <ItemCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};
