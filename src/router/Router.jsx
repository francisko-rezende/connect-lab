import { Login, Registration } from "@pages";
import { Route, Routes } from "react-router-dom";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         path: "/registro",
//         element: <Registration />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//     ],
//   },
// ]);

export const Router = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/cadastro" element={<Registration />} />
  </Routes>
);
