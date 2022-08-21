import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLogin } from "../utils/customHooks";

import { CenteredModal } from "./CenteredModal";

const defaultValues = {
  username: "",
  password: "",
};

export const CredentialModal = ({
  login,
  requestedLogin,
  cancelLogin,
}: ReturnType<typeof useLogin>) => {
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
    login(formValues.username, formValues.password);
  };

  return (
    <CenteredModal open={requestedLogin} onClose={() => cancelLogin()}>
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
    </CenteredModal>
  );
};
