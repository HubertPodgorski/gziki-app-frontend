import React, { useMemo } from "react";
import { Box, Chip } from "@mui/material";
import ChipsGrid from "./ChipsGrid";
import { DogWithAttendanceAndPlannedInfo } from "../helpers/types";
import { getColorsByStatus, sortByAttendance } from "../helpers/calendar";
import theme from "../helpers/theme";

interface Props {
  dogsWithAttendance: DogWithAttendanceAndPlannedInfo[];
  showIfPlanned?: boolean;
}

const DogAttendanceChips = ({ dogsWithAttendance, showIfPlanned }: Props) => {
  const sortedDogsByAttendance = useMemo(
    () => dogsWithAttendance.sort(sortByAttendance),
    [dogsWithAttendance]
  );

  return (
    <ChipsGrid>
      {sortedDogsByAttendance.map(({ name, _id, status, isPlanned }) => {
        const { color, background } = getColorsByStatus(status);

        return (
          <Box sx={{ position: "relative" }}>
            {showIfPlanned && !isPlanned && (
              <Box
                sx={{
                  background: theme.palette.warning.dark,
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  border: "1px solid #333",
                }}
              />
            )}

            <Chip
              label={name}
              key={_id}
              sx={{
                background,
                color,
              }}
            />
          </Box>
        );
      })}
    </ChipsGrid>
  );
};

export default DogAttendanceChips;
