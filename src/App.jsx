import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Container,
  CssBaseline,
} from "@mui/material";
import Home from "./pages/Home";
import Details from "./pages/Details";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <Router>
      <CssBaseline /> 
      <NavigationBar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Details />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
