import { Box, Card, IconButton, Typography } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import React, { useCallback, useContext, useEffect, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { AppContext } from "../../contexts/AppContext";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CrossPassModal from "../../components/modals/CrossPassModal";
import { CrossPass } from "../../helpers/types";
import { DataGrid } from "@mui/x-data-grid";
import { useSocketContext } from "../../hooks/useSocketContext";

const MyDogs = () => {
  const { user } = useAuthContext();
  const { dogs, setDogNoteEditingDog, crossPasses } = useContext(AppContext);
  const { socket } = useSocketContext();

  const [crossPassForDogId, setCrossPassForDogId] = useState<
    string | undefined
  >();
  const [editingCrossPass, setEditingCrossPass] = useState<
    CrossPass | undefined
  >();
  const [userDogs, setUserDogs] = useState(user?.dogs || []);

  const confirm = useConfirmModal();

  useEffect(() => {
    const userDogIds = user.dogs.flatMap(({ _id }) => _id);

    setUserDogs(
      dogs
        .filter(({ _id }) => userDogIds.includes(_id))
        .sort(({ name: aName }, { name: bName }) => {
          if (aName > bName) return 1;

          if (bName > aName) return -1;

          return 0;
        })
    );
  }, [user, dogs]);

  const getCrossPassesForDog = useCallback(
    (givenDogId: string): CrossPass[] =>
      crossPasses.filter(({ dogId }) => dogId === givenDogId),
    [crossPasses]
  );

  const onDeleteCrossPass = async (crossPassId: string) => {
    try {
      await confirm();
    } catch (e) {
      return;
    }

    socket.emit("delete_cross_pass", { _id: crossPassId });
  };

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {userDogs.map((dog) => (
        <Card
          key={dog._id}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
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

              <Typography>{dog.note || "Click button to add notes"}</Typography>
            </Box>

            <IconButton onClick={() => setDogNoteEditingDog(dog)}>
              <EditNoteIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="caption">Cross Passes</Typography>

            <DataGrid
              rows={getCrossPassesForDog(dog._id)}
              getRowId={(row) => row._id}
              columns={[
                {
                  headerName: "Running on",
                  field: "runningOnLights",
                  flex: 1,
                  valueGetter: (_, { runningOnLights, runningOnDog }) =>
                    runningOnLights ? "Lights" : runningOnDog?.name,
                },
                {
                  headerName: "Starting position",
                  field: "startingPosition",
                  flex: 1,
                },
                {
                  headerName: "Notes",
                  field: "note",
                  flex: 1,
                },
                {
                  headerName: "Actions",
                  field: "actions",
                  sortable: false,
                  renderCell: ({ row }) => (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();

                          onDeleteCrossPass(row._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setEditingCrossPass(row);
                          setCrossPassForDogId(dog._id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  ),
                },
              ]}
              disableRowSelectionOnClick
              hideFooter
              disableColumnMenu
            />

            <IconButton
              onClick={() => setCrossPassForDogId(dog._id)}
              sx={{ alignSelf: "flex-end" }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Card>
      ))}

      <CrossPassModal
        dogId={crossPassForDogId}
        onClose={() => {
          setCrossPassForDogId(undefined);
          setEditingCrossPass(undefined);
        }}
        open={!!crossPassForDogId}
        crossPass={editingCrossPass}
      />
    </Box>
  );
};

export default MyDogs;
