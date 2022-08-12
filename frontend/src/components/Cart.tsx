import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, IconButton, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useState } from "react";

import { useStore } from "../context";
import { CenteredModal } from "./CenteredModal";

export const Cart = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);
  const store = useStore();

  const itemsInCart = Object.keys(store.cart).length > 0;

  return (
    <>
      {itemsInCart && (
        <div className="my-auto mr-3">
          <IconButton onClick={() => setModalOpen(true)}>
            <ShoppingCartIcon />
          </IconButton>
        </div>
      )}
      <CenteredModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Typography variant="h3">Cart</Typography>
        {Object.entries(store.cart).map(([itemId, amount], index) => {
          const item = store.items.find((i) => i.id === itemId);
          return (
            <div key={index}>
              {item?.name} - {amount}
            </div>
          );
        })}

        <Typography>Total: {store.cartTotal}€</Typography>
        <Button
          variant="contained"
          onClick={() => {
            store.order();
            setModalOpen(false);
          }}
          sx={{ marginTop: "1rem" }}
        >
          Send order
        </Button>
      </CenteredModal>
    </>
  );
});
