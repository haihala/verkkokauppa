import { Modal, Paper } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const CenteredModal: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={() => onClose()}>
      <Paper
        sx={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          padding: "2rem",
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
};
