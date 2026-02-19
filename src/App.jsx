import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InventoryPage from "./pages/InventoryPage";
import SalesPage from "./pages/SalesPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Box minH="100vh" bg="bg.main">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/inventario" element={<InventoryPage />} />
            <Route path="/ventas" element={<SalesPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}
