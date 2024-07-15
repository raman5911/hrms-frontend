import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { DisplayRequestedToMe, DisplayAppliedByMe } from './DisplayRequest';

function Request() {
    const location = useLocation();
    const user = location.state?.user;
    console.log(user);

    useEffect(() => {

    }, []);

    const [inputValue, setInputValue] = useState({
        department: "",
        subject: "",
        desc: "",
      });
  
      const handleError = (err) =>
        toast.error(err, {
          position: "bottom-left",
        });
      const handleSuccess = (msg) =>
        toast.success(msg, {
          position: "bottom-left",
        });
  
      const handleSubmit = async (e) => {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_REQUEST_URL}/requests/create_request`,
            {
              ...inputValue,
              user
            },
            { withCredentials: true }
          );
          console.log(data);
          const { success, message } = data;
          if (success) {
            handleSuccess(message);
          } else {
            handleError(message);
          }
        } catch (error) {
          console.log(error);
        }
        setInputValue({
          ...inputValue,
          department: "",
          subject: "",
          desc: "",
        });
      };
  
      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prevInputValue) => ({
            ...prevInputValue,
            [name]: value,
        }));
      };

  const ReqForm = () => {
    // const [department, setDepartment] = useState("");
    // const [subject, setSubject] = useState("");
    // const [desc, setDesc] = useState("");

    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <InputLabel id="dept-select">Department</InputLabel>
          <Select
            labelId="dept-select"
            id="department"
            label="Department"
            name="department"
            value={inputValue.department}
            onChange={(e) => handleOnChange(e)}
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </div>
        <div>
          <TextField
            name="subject"
            id="subject"
            label="Subject"
            fullWidth
            value={inputValue.subject}
            onChange={(e) => {
              handleOnChange(e);
            }}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            name="desc"
            id="desc"
            label="Description"
            fullWidth
            multiline
            value={inputValue.desc}
            onChange={(e) => {
              handleOnChange(e);
            }}
            variant="outlined"
          />
        </div>
      </Box>
    );
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">
          Create New Request
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <ReqForm />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleSubmit();
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </BootstrapDialog>
    );
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  // dummy data for table requested to me (needs to be changed later)
  const req_to_me = [
    {
      name: "Sam",
      req_type: "Leave",
      reason: "Sick leave"
    },
    {
      name: "Myke",
      req_type: "IT equipment",
      reason: "Mouse is damaged"
    },
    {
      name: "Franklin",
      req_type: "HR",
      reason: "Appraisel request"
    }
  ];

  const my_requests = [
    {
      name: "Micheal",
      req_type: "Leave",
      reason: "Sick leave",
      status: "Pending",
      applied_on: "15/07/24"
    },
    {
      name: "Trevor",
      req_type: "IT equipment",
      reason: "Mouse is damaged",
      status: "Pending",
      applied_on: "15/07/24"
    },
    {
      name: "Lamar",
      req_type: "HR",
      reason: "Appraisel request",
      status: "Pending",
      applied_on: "15/07/24"
    },
  ];

  return (
    <div className="req_main" style={{ position: "relative", padding: "2rem 1rem" }}>
      <Button
        variant="contained"
        className="top_right_btn"
        onClick={handleClickOpen}
        style={{
          position: "absolute",
          right: "10px",
          top: "60px"
        }}
      >
        Create New Request
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />

      <h1>Requested to You</h1>

      <DisplayRequestedToMe requestsData={req_to_me} />

      <h1>Applied by you</h1>

      <DisplayAppliedByMe requestsData={my_requests} />

      <div></div>
    </div>
  );
}

export default Request;
