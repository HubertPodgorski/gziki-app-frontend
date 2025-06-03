import React, { useContext, useEffect, useMemo } from "react";
import { Button, DialogActions } from "@mui/material";
import { useSocketContext } from "../../hooks/useSocketContext";
import { FormProvider, useForm } from "react-hook-form";
import FormModal from "./../FormModal.jsx";
import FormGrid from "./../FormGrid.jsx";
import FormTextField from "./../inputs/FormTextField.jsx";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AppContext } from "../../contexts/AppContext";

interface FormData {
  note: string;
}

const NoteModal = () => {
  const { user } = useAuthContext();
  const { settings, dogNoteEditingDog, setDogNoteEditingDog } =
    useContext(AppContext);
  const { socket } = useSocketContext();

  const formMethods = useForm<FormData>({
    defaultValues: { note: dogNoteEditingDog?.note || "" },
  });

  useEffect(() => {
    formMethods.reset({ note: dogNoteEditingDog?.note || "" });
  }, [dogNoteEditingDog, formMethods]);

  const { handleSubmit, reset } = useMemo(() => formMethods, [formMethods]);

  useEffect(() => {
    if (!dogNoteEditingDog) return;

    reset({ note: dogNoteEditingDog.note || "" });
  }, [dogNoteEditingDog, reset]);

  const onClose = async () => {
    await socket.emit("update_settings", { userUpdatingNotes: null });

    setDogNoteEditingDog(undefined);
  };

  const onSubmit = async ({ note }) => {
    if (!dogNoteEditingDog) return;

    await socket.emit(
      "update_dog",
      { _id: dogNoteEditingDog._id, note: note || "" },
      () => onClose()
    );

    // TODO: error handling eventually?
  };

  // Disabling this feature for now
  const onEditingStart = async () => {
    if (!dogNoteEditingDog) return;

    await socket.emit("update_settings", { userUpdatingNotes: user._id });
  };

  const onEditingStop = async () => {
    if (!dogNoteEditingDog) return;

    await socket.emit("update_settings", { userUpdatingNotes: null });
  };

  const isAnotherUserEditing = useMemo(
    () =>
      settings?.userUpdatingNotes && user._id !== settings?.userUpdatingNotes,
    [settings, user]
  );

  return (
    <FormProvider {...formMethods}>
      <FormModal
        open={!!dogNoteEditingDog}
        onClose={onClose}
        title={`${dogNoteEditingDog?.name ?? "Dog"}'s notes`}
      >
        <FormGrid>
          <FormTextField
            name="note"
            label="Notes"
            rows={5}
            // Disabling this feature for now
            onFocus={onEditingStart}
            onBlur={onEditingStop}
            disabled={isAnotherUserEditing}
            helperText={
              isAnotherUserEditing ? "Another user updating notes" : undefined
            }
          />

          <DialogActions sx={{ padding: 0 }}>
            <Button size="medium" variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <Button
              size="medium"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Save notes
            </Button>
          </DialogActions>
        </FormGrid>
      </FormModal>
    </FormProvider>
  );
};

export default NoteModal;
