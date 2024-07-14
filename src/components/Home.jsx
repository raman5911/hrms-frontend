// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Dashboard from "./Dashboard";

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   useEffect(() => {
//     const user = location.state?.user;
//     console.log(user);

//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//       }
//       const { data } = await axios.post(
//         process.env.REACT_APP_REQUEST_URL,
//         {},
//         { withCredentials: true }
//       );
//       const { status, user } = data;
//       setUsername(user);
//       return status
//         ? toast(`Hello ${user}`, {
//             position: "top-right",
//           })
//         : (removeCookie("token"), navigate("/login"));
//     };
//     verifyCookie();
//     navigate("/dashboard", { state: { user: user }});
//   }, [cookies, navigate, removeCookie]);
//   const Logout = () => {
//     removeCookie("token");
//     navigate("/signup");
//   };

//   return (
//     <>
//       <div className="home_page">
        
//         {/* <h4>
//           {" "}
//           Welcome <span>{username}</span>
//         </h4>
//         <button onClick={Logout}>LOGOUT</button> */}

//         <Dashboard />

//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default Home;
