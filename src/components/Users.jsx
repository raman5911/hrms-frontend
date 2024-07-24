import React, { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import ViewUsers from "./ViewUsers";
import EditUser from "./EditUser";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Users() {
  const [data, setData] = useState([]);
  const isUsersListFetched = useRef(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_REQUEST_URL}/users/get_all`
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        isUsersListFetched.current = true;
        setData(data.data);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isUsersListFetched.current) fetchData();
  }, []);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const [viewDialogBox, setViewDialogBox] = useState(false);
  const [editDialogBox, setEditDialogBox] = useState(false);

  const [viewCurrentUser, setViewCurrentUser] = useState(null);
  const [editCurrentUser, setEditCurrentUser] = useState(null);

  useEffect(() => {
    if (viewCurrentUser) {
      setViewDialogBox(true);
    }
  }, [viewCurrentUser]);

  useEffect(() => {
    if (editCurrentUser) {
      setEditDialogBox(true);
    }
  }, [editCurrentUser]);

  const handleViewCurrentUser = (data) => {
    setViewCurrentUser(data);
  };

  const closeViewDialogBox = () => {
    setViewDialogBox(false);
    setViewCurrentUser(null);
  };

  const handleEditCurrentUser = (data) => {
    setEditCurrentUser(data);
  };

  const closeEditDialogBox = () => {
    setEditDialogBox(false);
    setEditCurrentUser(null);
  };

  const convertMongoValues = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (obj[key].$numberInt) {
          obj[key] = parseInt(obj[key].$numberInt);
        } else if (obj[key].$numberLong) {
          obj[key] = parseInt(obj[key].$numberLong);
        } else {
          convertMongoValues(obj[key]);
        }
      }
    }
  };

  return (
    <div>
      <Typography variant="h3">All Users</Typography>
      <div>
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data != undefined ? (
                data.map((row, index) => {
                  let rowCopy = { ...row };
                  convertMongoValues(rowCopy);

                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {row?.Employee_Id}
                      </TableCell>
                      <TableCell>{rowCopy?.Company}</TableCell>
                      <TableCell>{rowCopy?.Employee_details?.name}</TableCell>
                      <TableCell>{rowCopy?.Employee_details?.email}</TableCell>
                      <TableCell>{rowCopy?.Official_details?.role}</TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          sx={{ mr: 2 }}
                          onClick={() => {
                            handleViewCurrentUser(row);
                          }}
                          startIcon={<VisibilityIcon />}
                        >
                          View
                        </Button>
                        {/* <Button
                          variant="outlined"
                          sx={{ mr: 2 }}
                          onClick={() => {
                            handleEditCurrentUser(row);
                          }}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}> No requests available. </p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ViewUsers
        open={viewDialogBox}
        handleClose={closeViewDialogBox}
        data={viewCurrentUser}
      />
      {/* <EditUser
        open={editDialogBox}
        handleClose={closeEditDialogBox}
        data={editCurrentUser}
      /> */}
    </div>
  );
}

export default Users;
