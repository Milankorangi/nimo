import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Normalize styles across browsers */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Nimo Test Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Details />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
