import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Welcome from "./pages/Welcome";
import Conversation from "./pages/Conversation";
import Farewell from "./pages/Farewell";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/farewell" element={<Farewell />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
