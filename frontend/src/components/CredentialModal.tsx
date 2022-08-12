import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import { useState } from "react";

import { useStore } from "../context";

const defaultValues = {
  username: "",
  password: "",
};

export const CredentialModal = observer(() => {
  const store = useStore();

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { id, value } = event.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    store.login(formValues.username, formValues.password);
  };

  return (
    <Modal open={store.prompt_for_login}>
      <Paper
        sx={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          padding: "2rem",
        }}
      >
        <Typography variant="h3">Login</Typography>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <FormControl variant="standard">
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                value={formValues.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </Modal>
  );
});
