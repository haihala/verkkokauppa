import { observer } from "mobx-react";

import { ItemCard } from "../components";
import { useStore } from "../context";

export const Items = observer(() => {
  const { items } = useStore();

  return (
    <>
      {items.map((item, index) => (
        <ItemCard key={index} title={item.name} />
      ))}
    </>
  );
});
