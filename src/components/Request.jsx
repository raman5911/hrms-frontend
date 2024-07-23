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
import { styled, alpha } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { DisplayRequestedToMe, DisplayAppliedByMe } from "./DisplayRequest";

import {
  Leave,
  WorkFromHome,
  NewAsset,
  DamageRepair,
  ComplainForAsset,
  RequestHR,
} from "./RequestForms";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    // Apply styles to the Dialog's Paper component
    width: "800px", // Set your desired width
    height: "600px", // Set your desired height
    maxWidth: "none", // Override default maxWidth
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function SimpleDialog({
  onClose,
  open,
  handleSubmit,
  inputValue,
  handleOnChange,
}) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">Create New Request</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
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
        {/* <ReqForm inputValue={inputValue} handleOnChange={handleOnChange} /> */}
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

function Request() {
  const location = useLocation();
  const user = location.state?.user;
  console.log(user);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  // const handleSubmit = async (e) => {
  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_REQUEST_URL}/requests/create_request`,
  //       {
  //         ...inputValue,
  //         user,
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log(data);
  //     const { success, message } = data;
  //     if (success) {
  //       handleSuccess(message);
  //     } else {
  //       handleError(message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setInputValue({
  //     ...inputValue,
  //     department: "",
  //     subject: "",
  //     desc: "",
  //   });
  // };

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputValue((prevInputValue) => ({
  //     ...prevInputValue,
  //     [name]: value,
  //   }));
  // };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClose = (value) => {
  //   setOpen(false);
  //   setInputValue({
  //     ...inputValue,
  //     department: "",
  //     subject: "",
  //     desc: "",
  //   });
  // };

  // dummy data for table requested to me (needs to be changed later)
  const req_to_me = [
    {
      name: "Sam",
      req_type: "Leave",
      reason: "Sick leave",
    },
    {
      name: "Myke",
      req_type: "IT equipment",
      reason: "Mouse is damaged",
    },
    {
      name: "Franklin",
      req_type: "HR",
      reason: "Appraisel request",
    },
  ];

  const my_requests = [
    {
      name: "Micheal",
      req_type: "Leave",
      reason: "Sick leave",
      status: "Pending",
      applied_on: "15/07/24",
    },
    {
      name: "Trevor",
      req_type: "IT equipment",
      reason: "Mouse is damaged",
      status: "Pending",
      applied_on: "15/07/24",
    },
    {
      name: "Lamar",
      req_type: "HR",
      reason: "Appraisel request",
      status: "Pending",
      applied_on: "15/07/24",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (option) => {
    setAnchorEl(null);

    if (option) {
      setSelectedOption(option);
    }
  };

  // when option is changed new dialog will open
  useEffect(() => {
    if (selectedOption === "leave") {
      handleOpenForLeave();
    } else if (selectedOption === "wfh") {
      handleOpenForWFH();
    } else if (selectedOption === "new_asset") {
      handleOpenForNewAsset();
    } else if (selectedOption === "damage_asset") {
      handleOpenForDamageRepair();
    } else if (selectedOption === "complain_asset") {
      handleOpenForComplainForAsset();
    } else if (selectedOption === "hr_request") {
      handleOpenForRequestHR();
    }
  }, [selectedOption]);

  // states for all dialog boxes
  const [openDialogLeave, setOpenDialogLeave] = useState(false);
  const [openDialogWFH, setOpenDialogWFH] = useState(false);
  const [openDialogNewAsset, setOpenDialogNewAsset] = useState(false);
  const [openDialogDamageRepair, setOpenDialogDamageRepair] = useState(false);
  const [openDialogComplainForAsset, setOpenDialogComplainForAsset] =
    useState(false);
  const [openDialogRequestHR, setOpenDialogRequestHR] = useState(false);

  //open close handlers for all form dialog boxes
  const handleOpenForLeave = () => {
    setOpenDialogLeave(true);
  };
  const handleCloseForLeave = () => {
    setOpenDialogLeave(false);
    setSelectedOption(null);
  };

  const handleOpenForWFH = () => {
    setOpenDialogWFH(true);
  };
  const handleCloseForWFH = () => {
    setOpenDialogWFH(false);
    setSelectedOption(null);
  };

  const handleOpenForNewAsset = () => {
    setOpenDialogNewAsset(true);
  };
  const handleCloseForNewAsset = () => {
    setOpenDialogNewAsset(false);
    setSelectedOption(null);
  };

  const handleOpenForDamageRepair = () => {
    setOpenDialogDamageRepair(true);
  };
  const handleCloseForDamageRepair = () => {
    setOpenDialogDamageRepair(false);
    setSelectedOption(null);
  };

  const handleOpenForComplainForAsset = () => {
    setOpenDialogComplainForAsset(true);
  };
  const handleCloseForComplainForAsset = () => {
    setOpenDialogComplainForAsset(false);
    setSelectedOption(null);
  };

  const handleOpenForRequestHR = () => {
    setOpenDialogRequestHR(true);
  };
  const handleCloseForRequestHR = () => {
    setOpenDialogRequestHR(false);
    setSelectedOption(null);
  };

  return (
    <div
      className="req_main"
      style={{ position: "relative", padding: "2rem 1rem" }}
    >
      {/* <Button
        variant="contained"
        className="top_right_btn"
        onClick={handleClickOpen}
        style={{
          position: "absolute",
          right: "10px",
          top: "60px",
        }}
      >
        Create New Request
      </Button> */}

      <Button
        id="demo-customized-button"
        aria-controls={openMenu ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
          position: "absolute",
          right: "10px",
          top: "60px",
        }}
      >
        Apply For
      </Button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu("leave");
          }}
          disableRipple
        >
          Leave
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu("wfh");
          }}
          disableRipple
        >
          Work From Home
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => {
            handleCloseMenu("new_asset");
          }}
          disableRipple
        >
          New Asset
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu("damage_asset");
          }}
          disableRipple
        >
          Repair Asset
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            handleCloseMenu("complain_asset");
          }}
          disableRipple
        >
          Complain for Asset
        </MenuItem> */}

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => {
            handleCloseMenu("hr_request");
          }}
          disableRipple
        >
          Request to HR
        </MenuItem>
      </StyledMenu>

      {/* <SimpleDialog
        open={open}
        // onClose={handleClose}
        // handleSubmit={handleSubmit}
        // inputValue={inputValue}
        // handleOnChange={handleOnChange}
      /> */}

      <h3>Requested to You</h3>

      <DisplayRequestedToMe requestsData={req_to_me} />

      <h3>Applied by you</h3>

      <DisplayAppliedByMe requestsData={my_requests} />

      <Leave open={openDialogLeave} handleClose={handleCloseForLeave} />
      <WorkFromHome open={openDialogWFH} handleClose={handleCloseForWFH} />
      <NewAsset
        open={openDialogNewAsset}
        handleClose={handleCloseForNewAsset}
      />
      <DamageRepair
        open={openDialogDamageRepair}
        handleClose={handleCloseForDamageRepair}
      />
      <ComplainForAsset
        open={openDialogComplainForAsset}
        handleClose={handleCloseForComplainForAsset}
      />
      <RequestHR
        open={openDialogRequestHR}
        handleClose={handleCloseForRequestHR}
      />
    </div>
  );
}

export default Request;
