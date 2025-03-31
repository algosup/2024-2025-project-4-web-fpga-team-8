import { useState } from "react";
import { Select, MenuItem, Container, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

interface Props {
  moduleNames: string[];
  onSelect: (moduleName: string) => void;
}

function FileSelector({ moduleNames, onSelect }: Props) {
  const [selected, setSelected] = useState("");

  const handleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelected(value);        // Update local UI state
    onSelect(value);           // Notify parent of selection change
  };

  return (
    <Container>
      <Typography variant="h6">Select an FPGA Module:</Typography>
      <Select value={selected} onChange={handleChange} displayEmpty fullWidth>
        <MenuItem value="" disabled>
          Select a module
        </MenuItem>
        {moduleNames.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
}

export default FileSelector;