import { Card, Typography } from "@mui/material";

export type CardProps = {
  title: string;
  subtitle?: string;
  image?: string;
  alt?: string;
};

export const ItemCard = ({ title, subtitle, image, alt }: CardProps) => {
  console.log(image);

  return (
    <Card className="p-3 m-3 flex flex-row justify-between">
      {image && (
        <img src={image} alt={alt} className="w-24 h-24 object-cover" />
      )}
      <div className="flex flex-col gap-3">
        <Typography variant="h4">{title}</Typography>
        {subtitle && <Typography>{subtitle}</Typography>}
      </div>
    </Card>
  );
};
