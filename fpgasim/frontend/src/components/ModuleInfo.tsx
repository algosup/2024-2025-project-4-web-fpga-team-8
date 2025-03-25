import { Paper, Typography, Chip, Stack } from "@mui/material";
import { ModuleData } from "../types";

interface Props {
  module: ModuleData | null;
}

function ModuleInfo({ module }: Props) {
  if (!module) return null;

  return (
    <Paper elevation={3} style={{ padding: "1rem", marginTop: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Module: {module.module}
      </Typography>

      <Typography variant="subtitle1">Inputs:</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" marginBottom={1}>
        {module.inputs.map((input: string) => (
          <Chip key={input} label={input} size="small" />
        ))}
      </Stack>

      <Typography variant="subtitle1">Outputs:</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" marginBottom={1}>
        {module.outputs.map((output: string) => (
          <Chip key={output} label={output} size="small" color="primary" />
        ))}
      </Stack>

      <Typography variant="subtitle2">
        BEL Type: <strong>{module.bel_type || "N/A"}</strong>
      </Typography>

      <Typography variant="subtitle2">
        Timing Info:{" "}
        <strong>{module.timing ? "Available" : "Not Available"}</strong>
      </Typography>
    </Paper>
  );
}

export default ModuleInfo;
