import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useProducts } from "../utils/customHooks";

import { CenteredModal } from "./CenteredModal";

export const Cart = ({
  cart,
  products,
  submitOrder,
}: ReturnType<typeof useProducts>) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log("Cart render");

  const itemsInCart = Object.keys(cart).length > 0;
  const totalPrice = Object.entries(cart)
    .map(
      ([itemId, amount]) =>
        (products?.find((item) => item.id === itemId)?.price || 0) * amount
    )
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

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
        {Object.entries(cart).map(([itemId, amount], index) => {
          const item = products.find((i) => i.id === itemId);
          return (
            <div key={index}>
              {item?.name} - {amount}
            </div>
          );
        })}

        <Typography>Total: {totalPrice}€</Typography>
        <Button
          variant="contained"
          onClick={() => {
            submitOrder();
            setModalOpen(false);
          }}
          sx={{ marginTop: "1rem" }}
        >
          Send order
        </Button>
      </CenteredModal>
    </>
  );
};
