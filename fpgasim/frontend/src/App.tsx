import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FileSelector from "./components/FileSelector";
import FPGALayout from "./components/FPGALayout";

const API_URL = "http://127.0.0.1:5000";

export interface ModuleData {
  module: string;
  inputs: string[];
  outputs: string[];
  bel_type: string | null;
  timing?: Record<string, unknown>;
}

function App(): React.JSX.Element {
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  console.debug(selectedModule); // Avoid warning for now

  useEffect(() => {
    fetch(`${API_URL}/combined/combined_design_data.json`)
      .then((res) => res.json())
      .then((data) => setModules(data))
      .catch((err) => console.error("Failed to load combined data", err));
  }, []);

  const handleSelect = (moduleName: string) => {
    const selected = modules.find((m) => m.module === moduleName) || null;
    setSelectedModule(selected);
    console.log("Selected module data:", selected);
  };

  // Extract unique module names and sort them alphabetically
  const uniqueSortedModuleNames = [
    ...new Set(modules.map((m) => m.module)),
  ].sort();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        FPGA Simulator Interface
      </Typography>
      <FileSelector
        moduleNames={uniqueSortedModuleNames}
        onSelect={handleSelect}
      />
      <FPGALayout />
    </Container>
  );
}

export default App;
