import React, { useContext } from "react";
import { Box, Chip, IconButton, List, ListItem, useTheme } from "@mui/material";
import CenteredContent from "../../components/CenteredContent";
import DeleteIcon from "@mui/icons-material/Delete";
import UserForm from "../forms/UserForm";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import { AppContext } from "../../contexts/AppContext";
import { socket } from "../../components/SocketHandler";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import ChipsGrid from "../../components/ChipsGrid";

const Users = () => {
  const theme = useTheme();
  const confirm = useConfirmModal();
  const { users } = useContext(AppContext);

  const {
    formInitialData,
    editingId,
    formOpen,
    handleEditClick,
    handleFormClose,
  } = useFormHelpers({
    name: "",
    dogs: [],
  });

  const onDeleteClick = async (id) => {
    await confirm();

    socket.emit("delete_user", { _id: id });
  };

  const onFormClose = () => {
    handleFormClose();
  };

  const onEditClick = async ({ name, dogs }, id) => {
    await handleEditClick(
      {
        name,
        dogs,
      },
      id
    );
  };

  return (
    <>
      <CenteredContent>
        <List>
          {users.map(({ name, _id, dogs }) => (
            <ListItem
              divider
              key={_id}
              onClick={() => onEditClick({ name, dogs }, _id)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {name}

                {dogs.length > 0 && (
                  <ChipsGrid>
                    {dogs.map(({ name, _id }) => (
                      <Chip label={name} key={_id} />
                    ))}
                  </ChipsGrid>
                )}
              </Box>

              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();

                  onDeleteClick(_id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CenteredContent>

      <UserForm
        onClose={onFormClose}
        open={formOpen}
        initialData={formInitialData}
        editingId={editingId}
      />
    </>
  );
};

export default Users;
