import { observer } from "mobx-react";

import { GridLayout } from "../components";
import { useStore } from "../context";

export const Items = observer(() => {
  const { items } = useStore();

  return (
    <GridLayout
      items={items.map((item) => {
        return { title: item.name, subtitle: `${item.price}€` };
      })}
    />
  );
});
