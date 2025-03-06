import { Container, Typography } from "@mui/material";
import FileSelector from "./components/FileSelector";
import FPGALayout from "./components/FPGALayout";

function App(): React.JSX.Element {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        FPGA Simulator Interface
      </Typography>
      <FileSelector />
      <FPGALayout />
    </Container>
  );
}

export default App;