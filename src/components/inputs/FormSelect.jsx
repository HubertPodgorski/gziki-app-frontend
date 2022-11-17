import React, { useCallback } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormSelect = ({ options, name, label, multi = true }) => {
  const { control } = useFormContext();

  const generateSelectOptions = useCallback(() => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  }, [options]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            onChange={onChange}
            value={value}
            label={label}
            multiple={multi}
          >
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
