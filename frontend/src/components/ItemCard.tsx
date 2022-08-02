import { Card, Grid, Typography } from "@mui/material";

type Props = {
  title: string;
  subtitle?: string;
  image?: string;
  alt?: string;
};

export const ItemCard = ({ title, subtitle, image, alt }: Props) => {
  console.log(image);

  return (
    <Card>
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
