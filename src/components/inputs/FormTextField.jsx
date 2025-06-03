import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const FormTextField = ({
  name,
  label,
  required = false,
  type,
  rules = {},
  rows = 1,
  onFocus,
  onBlur,
  helperText = "",
  disabled = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required, ...rules }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          label={label}
          required={required}
          type={type}
          error={!!error}
          helperText={helperText ?? error?.message ?? ""}
          multiline={rows > 1}
          rows={rows}
          disabled={disabled}
        />
      )}
    />
  );
};

export default FormTextField;
