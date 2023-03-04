import { Route, BrowserRouter, Routes } from "react-router-dom";
import Details from "./components/Details/Details";
import List from "./components/List/List";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<List />} />
        <Route
          path="/details/*"
          element={
            <Routes>
              <Route path="/" element={<Details />} />
              <Route path="/:id" element={<Details />} />
            </Routes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
