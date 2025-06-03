import { Box, Card, IconButton, Typography } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { useContext, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import NoteModal from "../../components/modals/NoteModal";
import { Dog } from "../../helpers/types";
import { AppContext } from "../../contexts/AppContext";

const MyDogs = () => {
  const { user } = useAuthContext();
  const { setDogNoteEditingDog } = useContext(AppContext);

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {user.dogs
        .sort(({ name: aName }, { name: bName }) => {
          if (aName > bName) return 1;

          if (bName > aName) return -1;

          return 0;
        })
        .map((dog) => (
          <Card
            key={dog._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              padding: 1,
            }}
          >
            <Typography variant="h6">{dog.name}</Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption">Notes:</Typography>

                <Typography>
                  {dog.note || "Click button to add notes"}
                </Typography>
              </Box>

              <IconButton onClick={() => setDogNoteEditingDog(dog)}>
                <EditNoteIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
    </Box>
  );
};

export default MyDogs;
