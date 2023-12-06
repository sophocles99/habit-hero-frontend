import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login"
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
