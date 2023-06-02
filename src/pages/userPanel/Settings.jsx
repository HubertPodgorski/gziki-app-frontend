import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../helpers/theme";
import { subscribe } from "../../helpers/serviceWorkerHelpers";
import { useSocketContext } from "../../hooks/useSocketContext";
import { AppContext } from "../../contexts/AppContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const Settings = () => {
  const { socket } = useSocketContext();
  const { subscriptionDetails, setSubscriptionDetails } =
    useContext(AppContext);
  const { user } = useAuthContext();

  const notificationsOn = user._id === subscriptionDetails?.userId;

  return (
    <Box>
      <Typography variant="h4">Settings</Typography>

      <Button
        variant="contained"
        onClick={() => subscribe(socket, setSubscriptionDetails)}
        sx={{ marginTop: theme.spacing(2) }}
        disabled={notificationsOn}
      >
        {notificationsOn ? "Notifications enabled" : "Enable notifications"}
      </Button>
    </Box>
  );
};

export default Settings;
