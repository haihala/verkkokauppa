import { Card, Typography } from "@mui/material";

export type CardProps = {
  title: string;
  element?: React.ReactNode;
  image?: string;
  alt?: string;
};

export const ItemCard = ({ title, element, image, alt }: CardProps) => {
  return (
    <Card className="p-3 m-3 flex flex-row justify-between">
      {image && (
        <img src={image} alt={alt} className="w-24 h-24 object-cover" />
      )}
      <div className="flex flex-col gap-3 items-end">
        <Typography variant="h4">{title}</Typography>
        {element}
      </div>
    </Card>
  );
};
