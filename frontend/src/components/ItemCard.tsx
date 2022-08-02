import { Card, Grid, Typography } from "@mui/material";

type Props = {
  title: string;
  subtitle?: string;
  image?: string;
};

export const ItemCard = ({ title, subtitle, image }: Props) => {
  return (
    <Card>
      <Grid container>
        {image && (
          <Grid item xs={5}>
            <img src={image} alt="Cat" />
          </Grid>
        )}
        <Grid item xs={7}>
          <Typography variant="h4">{title}</Typography>
          {subtitle && <Typography>{subtitle}</Typography>}
        </Grid>
      </Grid>
    </Card>
  );
};
