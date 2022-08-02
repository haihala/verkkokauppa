import React, { useEffect } from "react";
import { useStore } from "../context";

export const App: React.FC = () => {
  const { items } = useStore();

  // Re-render if items changes. There is probably a nicer way to do this.
  useEffect(() => {}, [items]);

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          Item: "{item.name}" Price: {item.price}
        </div>
      ))}
    </>
  );
};
