// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./components/Dashboard";
// // import Profile from "./Profile";
// // import Login from "./Login";

// function App() {
//   return (
//     <Router>
//       <div className="flex min-h-screen bg-gray-100">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content */}
//         <div className="flex-1 overflow-hidden">
//           <Routes>
//             <Route path="/" element={<Navigate to="/dashboard" />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             {/* <Route path="/profile" element={<Profile />} /> */}
//             {/* <Route path="/login" element={<Login />} /> */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Profile from "./components/Profile";
// import Topbar from "./components/Topbar";
// function App() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/dashboard" /> : <Login />}
//         />
//         <Route
//           path="/signup"
//           element={user ? <Navigate to="/dashboard" /> : <Signup />}
//         />
//         <Route
//           path="/dashboard"
//           element={user ? <Dashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//       path="/profile"
//       element={user ? <Profile /> : <Navigate to="/login" />}
//     />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route, Navigate, UNSAFE_WithComponentProps } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./components/Profile";
import HRLogin from "./pages/HRLogin";
import HrDashboard from "./components/HrDashboard";
import Recruitment from "./pages/Recruitment";
// import mongoose from "mongoose";
// import MatchedApplications from "./components/MatchedApplications";
function App() {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(
    storedUser && storedUser !== "undefined" && storedUser !== "null"
      ? JSON.parse(storedUser)
      : null
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup setUser={setUser} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />

<Route
  path="/hr-login"
  element={<HRLogin setUser={setUser} />}
/>

{/* <Route
  path="/applications/matched"
  element={<MatchedApplications />}
/> */}

{/* <Route
  path="/hr-dashboard"
  element={
    JSON.parse(localStorage.getItem("user"))?.role === "hr"
      ? <HrDashboard />
      : <Navigate to="/hr-login" />
  }
/> */}


<Route
  path="/hr-dashboard"
  element={
    user?.role === "hr" ? <HrDashboard /> : <Navigate to="/hr-login" />
  }
/>


<Route
  path="/recruitment"
  element={user ? <Recruitment /> : <Navigate to="/login" />}
/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
