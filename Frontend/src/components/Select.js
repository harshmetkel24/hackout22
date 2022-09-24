import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels({
  label,
  helperText,
  data,
  setter,
  value,
}) {
  const handleChange = (event) => {
    setter(event.target.value);
  };

  return (
    <>
      <FormControl
        sx={{
          m: 1,
          width: {
            md: 450,
            sm: 400,
            xs: 300,
          },
        }}
      >
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label="Age"
          variant="filled"
          color="warning"
          onChange={handleChange}
        >
          {data.map((item, index) => (
            <MenuItem value={index + 1}>{item}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </>
  );
}
