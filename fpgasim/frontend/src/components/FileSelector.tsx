import { useEffect, useState } from "react";
import { Select, MenuItem, Container, Typography } from "@mui/material";

const API_URL = "http://127.0.0.1:5000";

function FileSelector() {
  const [examples, setExamples] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");

  useEffect(() => {
    fetch(`${API_URL}/examples`)
      .then((response) => response.json())
      .then((data: string[]) => setExamples(data));
  }, []);

  return (
    <Container>
      <Typography variant="h6">Select an FPGA Example:</Typography>
      <Select
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select a file
        </MenuItem>
        {examples.map((file) => (
          <MenuItem key={file} value={file}>
            {file.replace(/_post_synthesis|\.v/g, "")}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
}

export default FileSelector;
