import { observer } from "mobx-react";

import { GridLayout } from "../components";
import { useStore } from "../context";

export const Cats = observer(() => {
  const { cats } = useStore();

  return (
    <GridLayout
      items={cats.map((cat) => {
        return { title: cat.name, image: cat.image };
      })}
    />
  );
});
