import { observer } from "mobx-react";

import { ItemCard } from "../components";
import { useStore } from "../context";

export const Cats = observer(() => {
  const { cats } = useStore();

  return (
    <>
      {cats.map((cat, index) => (
        <ItemCard key={index} title={cat.name} image={cat.image} />
      ))}
    </>
  );
});
