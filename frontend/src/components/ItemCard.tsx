import { Card, Grid, Typography } from "@mui/material";

export type CardProps = {
  title: string;
  subtitle?: string;
  image?: string;
  alt?: string;
};

export const ItemCard = ({ title, subtitle, image, alt }: CardProps) => {
  console.log(image);

  return (
    <Card className="p-3 m-3">
      <Grid container>
        {image && (
          <Grid item xs={5}>
            <img src={image} alt={alt} className="w-24 h-24 object-cover" />
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
