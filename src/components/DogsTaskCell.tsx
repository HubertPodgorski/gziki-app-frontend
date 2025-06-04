import React, { useContext } from "react";
import { Chip, Typography } from "@mui/material";
import ChipsGrid from "./ChipsGrid";
import TaskCell from "./tasksGrid/TaskCell";
import { useAuthContext } from "../hooks/useAuthContext";
import { isMyDog } from "../helpers/tasks";
import { useIsMobile } from "../hooks/useIsMobile";
import { Dog, Task } from "../helpers/types";
import { AppContext } from "../contexts/AppContext";

// TODO: type me
interface Props {
  item: Task;
  index: number;
}

const DogsTaskCell = ({ item: { _id, dogs, description }, index }: Props) => {
  const isMobile = useIsMobile();
  const { user } = useAuthContext();
  const { setDogNoteEditingDog } = useContext(AppContext);

  return (
    <>
      <TaskCell index={index} id={_id} key={_id}>
        <Typography variant={isMobile ? "body2" : "h5"}>
          {description}
        </Typography>

        {dogs.length > 0 && (
          <ChipsGrid dense>
            {dogs.map((dog: Dog) => {
              const { name, _id } = dog;

              return (
                <Chip
                  label={`${name}`}
                  key={_id}
                  color={isMyDog(_id, user.dogs) ? "success" : "default"}
                  onClick={() => setDogNoteEditingDog(dog)}
                />
              );
            })}
          </ChipsGrid>
        )}

        {dogs.length === 0 && <Typography>No dogs selected</Typography>}
      </TaskCell>
    </>
  );
};

export default DogsTaskCell;
