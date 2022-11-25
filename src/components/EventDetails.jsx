import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import ChipsGrid from "./ChipsGrid";
import ButtonsGrid from "./ButtonsGrid";
import { AppContext } from "../contexts/AppContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { socket } from "./SocketHandler";
import { useIsMobile } from "../hooks/useIsMobile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { sortByAttendance } from "../helpers/calendar";

const EventDetails = ({ users, dogs, id }) => {
  const theme = useTheme();

  const [detailsOpen, setDetailsOpen] = useState(false);

  const { dogs: allDogs, users: allUsers } = useContext(AppContext);
  const { user } = useAuthContext();

  const isMobile = useIsMobile();

  const usersWithAttendance = useMemo(
    () =>
      allUsers.map((user) => {
        const userFound = users.find(
          ({ _id: currentEventUserId }) => currentEventUserId === user._id
        );

        if (!userFound || !userFound.status) return user;

        return { ...user, status: userFound.status };
      }),
    [allUsers, users]
  );

  const dogsWithAttendance = useMemo(
    () =>
      allDogs.map((dog) => {
        const dogFound = dogs.find(
          ({ _id: currentEventDogId }) => currentEventDogId === dog._id
        );

        if (!dogFound || !dogFound.status) return dog;

        return { ...dog, status: dogFound.status };
      }),
    [allDogs, dogs]
  );

  const getDogColors = useCallback(
    (_id) => {
      const defaultColors = {
        background: "yellow",
        color: "#333",
        button: "warning",
      };

      const dogFound = dogs.find(
        ({ _id: currentDogId }) => currentDogId === _id
      );

      if (!dogFound) return defaultColors;

      if (dogFound?.status === "PRESENT")
        return { background: "green", color: "#fff", button: "success" };

      if (dogFound?.status === "ABSENT")
        return { background: "red", color: "#fff", button: "error" };

      return defaultColors;
    },
    [dogs]
  );

  const getUserColors = useCallback(
    (_id) => {
      const defaultColors = {
        background: "yellow",
        color: "#333",
        button: "warning",
      };

      const userFound = users.find(
        ({ _id: currentEventUserId }) => currentEventUserId === _id
      );

      if (!userFound) return defaultColors;

      if (userFound?.status === "PRESENT")
        return { background: "green", color: "#fff", button: "success" };

      if (userFound?.status === "ABSENT")
        return { background: "red", color: "#fff", button: "error" };

      return defaultColors;
    },
    [users]
  );

  const onDogPresenceUpdateClick = (dogId) => {
    socket.emit("toggle_event_dog", { dogId, _id: id });
  };

  const onUserPresenceUpdateClick = () => {
    socket.emit("toggle_event_user", { userId: user._id, _id: id });
  };

  const handleDetailsOpenChange = () => {
    setDetailsOpen(!detailsOpen);
  };

  const sortedDogsByAttendance = useMemo(
    () => dogsWithAttendance.sort(sortByAttendance),
    [dogsWithAttendance]
  );

  const sortedUsersByAttendance = useMemo(
    () => usersWithAttendance.sort(sortByAttendance),
    [usersWithAttendance]
  );

  const getColorsByStatus = (status) => {
    const defaultColors = {
      background: "yellow",
      color: "#333",
    };

    if (!status) return defaultColors;

    if (status === "PRESENT") return { background: "green", color: "#fff" };

    if (status === "ABSENT") return { background: "red", color: "#fff" };

    return defaultColors;
  };

  const getUserButtonColorById = useCallback(
    (_id) => {
      const defaultColor = "warning";

      const userFound = users.find(
        ({ _id: currentEventUserId }) => currentEventUserId === _id
      );

      if (!userFound) return defaultColor;

      if (userFound?.status === "PRESENT") return "success";

      if (userFound?.status === "ABSENT") return "error";

      return defaultColor;
    },
    [users]
  );

  const getDogButtonColorById = useCallback(
    (_id) => {
      const defaultColor = "warning";

      const dogFound = dogs.find(
        ({ _id: currentDogId }) => currentDogId === _id
      );

      if (!dogFound) return defaultColor;

      if (dogFound?.status === "PRESENT") return "success";

      if (dogFound?.status === "ABSENT") return "error";

      return defaultColor;
    },
    [dogs]
  );

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={detailsOpen}
      onChange={handleDetailsOpenChange}
      disableGutters
      sx={{
        background: "#333",
        padding: theme.spacing(1),
        boxShadow: "none",
        [".MuiAccordionDetails-root"]: {
          padding: 0,
        },
        [".MuiAccordionSummary-root"]: {
          minHeight: 0,
          padding: 0,
        },
        [".MuiAccordionSummary-content"]: {
          margin: 0,
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{detailsOpen ? "Hide" : "Show"} details</Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          display: "grid",
          gridAutoFlow: "rows",
          gridGap: theme.spacing(2),

          [theme.breakpoints.down("md")]: {
            gridGap: theme.spacing(1),
          },
        }}
      >
        <ChipsGrid>
          {sortedDogsByAttendance.map(({ name, _id, status }) => {
            const { color, background } = getColorsByStatus(status);

            return (
              <Chip
                label={name}
                key={_id}
                sx={{
                  background,
                  color,
                }}
              />
            );
          })}
        </ChipsGrid>

        <ChipsGrid people>
          {sortedUsersByAttendance.map(({ name, _id, status }) => {
            const { color, background } = getColorsByStatus(status);
            return (
              <Chip
                label={name}
                key={_id}
                sx={{
                  background,
                  color,
                }}
              />
            );
          })}
        </ChipsGrid>

        <Typography variant={isMobile ? "body2" : "body1"}>
          Select dog{user.dogs.length > 1 ? "s" : ""} attendance
        </Typography>

        {user.dogs.length > 0 && (
          <ButtonsGrid sx={{ justifyContent: "flex-start" }}>
            {user.dogs.map(({ _id: dogId, name }) => (
              <Button
                variant="contained"
                key={dogId}
                color={getDogButtonColorById(dogId)}
                onClick={() => onDogPresenceUpdateClick(dogId)}
                sx={{ minWidth: "150px" }}
              >
                {name}
              </Button>
            ))}
          </ButtonsGrid>
        )}

        <Typography variant={isMobile ? "body2" : "body1"}>
          Select my attendance
        </Typography>

        <ButtonsGrid sx={{ justifyContent: "flex-start" }}>
          <Button
            variant="contained"
            color={getUserButtonColorById(user._id)}
            onClick={() => onUserPresenceUpdateClick()}
            sx={{ minWidth: "150px" }}
          >
            {user.name}
          </Button>
        </ButtonsGrid>
      </AccordionDetails>
    </Accordion>
  );
};

export default EventDetails;
