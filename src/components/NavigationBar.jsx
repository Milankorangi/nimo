import { AppBar, Toolbar, Box } from "@mui/material";
import logo from "../assets/logo.svg";

export default function CustomToolbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          px: {
            xs: 2,
            sm: 4,
            md: 8,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
