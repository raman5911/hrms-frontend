import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Box, Grid, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import {
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ViewTemplateDetails from "./ViewTemplateDetails";
import EditTemplate from "./EditTemplate";

import "./templates.css";
import { getDate } from "../Utils";

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

const ReqForm = ({
  inputValue,
  handleOnChange,
  handleLevelOfApprovalChange,
  handleApproverChange,
  addTableRow,
  handleTableRowChange,
  deleteTableRow,
  approverOptions,
  mailTemplateOptions,
  handleOnChangeForMail,
}) => {
  const fieldTypeOptions = ["Text", "Number", "Email", "Date"]; // Add your field type options here

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      style={{
        padding: " 1rem 1.5rem",
      }}
    >
      <Grid
        container
        justifyContent="center"
        spacing="10"
        style={{ margin: "auto 2rem", width: "500px" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            name="name"
            label="Template Name"
            value={inputValue.name}
            onChange={handleOnChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <InputLabel id="levelOfApproval" style={{ margin: "0.5rem auto" }}>
            Select Level of Approvals
          </InputLabel>

          <Select
            name="levelOfApproval"
            id="levelOfApproval"
            value={inputValue.levelOfApproval}
            onChange={handleLevelOfApprovalChange}
            fullWidth
            displayEmpty
            renderValue={(value) => (value ? value : <em>Choose an option</em>)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </Grid>

        {/* <Grid item xs={12} sm={12} md={12}>
          {inputValue.approvers.map((approver, index) => (
            <div key={index}>
              <InputLabel id={`approver${index + 1}`}>
                Approver {index + 1}
              </InputLabel>
              <Select
                name={`approver${index + 1}`}
                id={`approver${index + 1}`}
                value={approver.userID}
                onChange={(e) => handleApproverChange(index, e.target.value)}
                fullWidth
                displayEmpty
                renderValue={(userID) =>
                  userID ? (
                    approverOptions.find((opt) => opt.userID === userID)?.name
                  ) : (
                    <em>Choose Approver {index + 1} name</em>
                  )
                }
                style={{ margin: "10px auto" }}
              >
                {approverOptions.map((option) => (
                  <MenuItem key={option.userID} value={option.userID}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ))}
        </Grid> */}

        <Grid item xs={12} sm={12} md={12}>
          <InputLabel id="emailTemplate" style={{ margin: "0.5rem auto" }}>
            Select Email Template
          </InputLabel>

          <Select
            name="emailTemplate"
            id="emailTemplate"
            value={inputValue.emailTemplate.name}
            onChange={handleOnChangeForMail}
            fullWidth
            displayEmpty
            renderValue={(value) => {
              const selectedTemplate = mailTemplateOptions.find(
                (option) => option._id === value
              );
              return selectedTemplate ? (
                selectedTemplate.name
              ) : (
                <em>Choose an option</em>
              );
            }}
          >
            {mailTemplateOptions.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <InputLabel
            id="remainderEmailTemplate"
            style={{ margin: "0.5rem auto" }}
          >
            Select Remainder Email Template
          </InputLabel>

          <Select
            name="remainderEmailTemplate"
            id="remainderEmailTemplate"
            value={inputValue.remainderEmailTemplate.name}
            onChange={handleOnChangeForMail}
            fullWidth
            displayEmpty
            renderValue={(value) => {
              const selectedTemplate = mailTemplateOptions.find(
                (option) => option._id === value
              );
              return selectedTemplate ? (
                selectedTemplate.name
              ) : (
                <em>Choose an option</em>
              );
            }}
          >
            {mailTemplateOptions.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <InputLabel
            id="responseEmailTemplate"
            style={{ margin: "0.5rem auto" }}
          >
            Select Response Email Template
          </InputLabel>

          <Select
            name="responseEmailTemplate"
            id="responseEmailTemplate"
            value={inputValue.responseEmailTemplate.name}
            onChange={handleOnChangeForMail}
            fullWidth
            displayEmpty
            renderValue={(value) => {
              const selectedTemplate = mailTemplateOptions.find(
                (option) => option._id === value
              );
              return selectedTemplate ? (
                selectedTemplate.name
              ) : (
                <em>Choose an option</em>
              );
            }}
          >
            {mailTemplateOptions.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sm={12} md={12} style={{ marginTop: "1rem" }}>
          <Grid
            container
            alignItems="center"
            style={{ marginBottom: "0.7rem" }}
          >
            <Grid item xs={6}>
              <Typography variant="h6">Custom Input Fields</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button onClick={addTableRow} startIcon={<AddIcon />}>
                Add New Field
              </Button>
            </Grid>
          </Grid>

          {inputValue.tableRows.map((row, index) => (
            <React.Fragment key={row.id}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5} style={{ marginBottom: "1rem" }}>
                  <TextField
                    name={`field_${index + 1}_name`}
                    label="Input Field Name"
                    fullWidth
                    value={row.name}
                    onChange={(e) =>
                      handleTableRowChange(row.id, "fieldName", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={5} style={{ marginBottom: "1rem" }}>
                  <Select
                    id={`field_${index + 1}_type`}
                    value={row.type}
                    onChange={(e) =>
                      handleTableRowChange(row.id, "fieldType", e.target.value)
                    }
                    fullWidth
                    displayEmpty
                    renderValue={(value) =>
                      value ? value : <em>Choose input type</em>
                    }
                  >
                    {fieldTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={2} style={{ marginBottom: "1rem" }}>
                  <Button
                    onClick={() => deleteTableRow(row.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

function SimpleDialog({
  onClose,
  open,
  handleSubmit,
  inputValue,
  handleOnChange,
  handleLevelOfApprovalChange,
  handleApproverChange,
  addTableRow,
  handleTableRowChange,
  deleteTableRow,
  approverOptions,
  mailTemplateOptions,
  handleOnChangeForMail,
}) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        Create New Template
      </DialogTitle>
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
        <ReqForm
          inputValue={inputValue}
          handleOnChange={handleOnChange}
          handleLevelOfApprovalChange={handleLevelOfApprovalChange}
          handleApproverChange={handleApproverChange}
          addTableRow={addTableRow}
          handleTableRowChange={handleTableRowChange}
          deleteTableRow={deleteTableRow}
          approverOptions={approverOptions}
          mailTemplateOptions={mailTemplateOptions}
          handleOnChangeForMail={handleOnChangeForMail}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleSubmit();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

const DisplayAllTemplates = ({
  allData,
  handleCurrentOpened,
  handleEditCurrent,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>Template Name</TableCell>
            <TableCell>Level of Approvals</TableCell>
            <TableCell>Last Modified On</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allData != undefined ? (
            allData.map((data, index) => (
              <TableRow
                key={data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell>{data.levelOfApproval}</TableCell>
                <TableCell>
                  {getDate(data?.updatedAt, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleCurrentOpened(data);
                    }}
                    startIcon={<VisibilityIcon />}
                    sx={{ mr: 2 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleEditCurrent(data);
                    }}
                    startIcon={<EditIcon />}
                    sx={{ mr: 2 }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p style={{ textAlign: "center" }}> No templates available. </p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Templates = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    emailTemplate: "",
    remainderEmailTemplate: "",
    responseEmailTemplate: "",
    levelOfApproval: "",
    approvers: [], // This will hold approver names based on level of approval
    tableRows: [], // This will hold the rows of the dynamic table
  });

  const [approverOptions, setApproverOptions] = useState([]);
  const [mailTemplateOptions, setMailTemplateOptions] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);

  const isUsersListFetched = useRef(false);
  const isMailTemplatesFetched = useRef(false);
  const isAllTemplatesFetched = useRef(false);

  const fetchUsersList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_REQUEST_URL}/users/list`
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        isUsersListFetched.current = true;
        setApproverOptions(data.data);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMailTemplatesList = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_REQUEST_URL}/email_templates/fetch_list`
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        isMailTemplatesFetched.current = true;
        setMailTemplateOptions(data.data);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTemplatesData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_REQUEST_URL}/templates/fetch_all`
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        isAllTemplatesFetched.current = true;
        setAllTemplates(data.data);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isUsersListFetched.current) fetchUsersList();

    if (!isMailTemplatesFetched.current) fetchMailTemplatesList();

    if (!isAllTemplatesFetched.current) fetchTemplatesData();
  }, []);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLevelOfApprovalChange = (e) => {
    const level = parseInt(e.target.value, 10);
    setInputValue((prevState) => ({
      ...prevState,
      levelOfApproval: level,

      // this will create a new array of length level and assign default values using map function
      approvers: Array.from({ length: level }, (_, i) => ({
        id: i,
        name: "",
      })),
    }));
  };

  // const handleApproverChange = (index, userID) => {
  //   const selectedApprover = approverOptions.find(
  //     (opt) => opt.userID === userID
  //   );
  //   setInputValue((prevState) => ({
  //     ...prevState,
  //     approvers: prevState.approvers.map((approver, i) =>
  //       i === index
  //         ? { ...approver, userID, name: selectedApprover.name }
  //         : approver
  //     ),
  //   }));
  // };

  // add rows
  const addTableRow = () => {
    setInputValue((prevState) => ({
      ...prevState,
      tableRows: [
        ...prevState.tableRows,
        { id: Date.now(), fieldName: "", fieldType: "" },
      ],
    }));
  };

  // handle row values
  const handleTableRowChange = (id, name, value) => {
    setInputValue((prevState) => ({
      ...prevState,
      tableRows: prevState.tableRows.map((row) =>
        row.id === id ? { ...row, [name]: value } : row
      ),
    }));
  };

  // delete rows
  const deleteTableRow = (id) => {
    setInputValue((prevState) => ({
      ...prevState,
      tableRows: prevState.tableRows.filter((row) => row.id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_REQUEST_URL}/templates/create`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        handleClose();
      } else {
        handleError(message);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      name: "",
      emailTemplate: "",
      remainderEmailTemplate: "",
      responseEmailTemplate: "",
      levelOfApproval: "",
      approvers: [],
      tableRows: [],
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleOnChangeForMail = (e) => {
    const { name, value } = e.target;

    const selectedTemplate = mailTemplateOptions.find(
      (option) => option._id === value
    );

    setInputValue((prevState) => ({
      ...prevState,
      [name]: {
        id: selectedTemplate._id,
        name: selectedTemplate.name,
        category: selectedTemplate.category,
      },
    }));
  };

  const [open, setOpen] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentOpenedTemplate, setCurrentOpenedTemplate] = useState(false);
  const [editCurrentTemplate, setEditCurrentTemplate] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    if (currentOpenedTemplate) {
      setOpenDetailsDialog(true);
    }
  }, [currentOpenedTemplate]);

  useEffect(() => {
    if (editCurrentTemplate) {
      setOpenEditDialog(true);
    }
  }, [editCurrentTemplate]);

  const handleCurrentOpened = (data) => {
    setCurrentOpenedTemplate(data);
  };

  const closeDetailDialogBox = () => {
    setOpenDetailsDialog(false);
    setCurrentOpenedTemplate(null); // Clear data
  };

  const handleEditCurrent = (data) => {
    setEditCurrentTemplate(data);
  };

  const closeEditDialogBox = () => {
    setOpenEditDialog(false);
    setEditCurrentTemplate(null); // Clear data
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setInputValue({
      ...inputValue,
      name: "",
      emailTemplate: {
        id: "",
        name: "",
        category: "",
      },
      remainderEmailTemplate: {
        id: "",
        name: "",
        category: "",
      },
      responseEmailTemplate: {
        id: "",
        name: "",
        category: "",
      },
      levelOfApproval: "",
      approvers: [],
      tableRows: [],
    });
  };

  return (
    <div
      className="req_main"
      style={{ position: "relative", padding: "2rem 1rem" }}
    >
      <Button
        variant="contained"
        className="top_right_btn"
        onClick={handleClickOpen}
        style={{
          position: "absolute",
          right: "10px",
          top: "45px",
        }}
      >
        Create New Template
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        handleOnChange={handleOnChange}
        handleLevelOfApprovalChange={handleLevelOfApprovalChange}
        // handleApproverChange={handleApproverChange}
        addTableRow={addTableRow}
        handleTableRowChange={handleTableRowChange}
        deleteTableRow={deleteTableRow}
        approverOptions={approverOptions}
        mailTemplateOptions={mailTemplateOptions}
        handleOnChangeForMail={handleOnChangeForMail}
      />

      <h2 className="templates">All Templates</h2>

      <div>
        <DisplayAllTemplates
          allData={allTemplates}
          handleCurrentOpened={handleCurrentOpened}
          handleEditCurrent={handleEditCurrent}
        />
        <ViewTemplateDetails
          open={openDetailsDialog}
          handleClose={closeDetailDialogBox}
          data={currentOpenedTemplate}
          mailOptions={mailTemplateOptions}
        />

        <EditTemplate
          open={openEditDialog}
          handleClose={closeEditDialogBox}
          data={editCurrentTemplate}
          mailOptions={mailTemplateOptions}
        />
      </div>
    </div>
  );
};

export default Templates;
