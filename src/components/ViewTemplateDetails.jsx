import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
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

function SimpleDialog({ onClose, open, data, mailOptions }) {
  // selecting name of that row of array where id matches
  const findSelectedMailOpt = (param) => {
    return mailOptions.find((arr) => arr._id === param)?.name;
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">Template Details</DialogTitle>
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
        <Typography>Template Name: {data?.name}</Typography>        
        <Typography>Level of Approval: {data?.levelOfApproval}</Typography>
        <Typography>
          Email Template Name:{" "}
          {data !== undefined ? findSelectedMailOpt(data?.emailTemplate) : ""}
        </Typography>
        <Typography>
          Remainder Email Template Name:{" "}
          {data !== undefined
            ? findSelectedMailOpt(data?.remainderEmailTemplate)
            : ""}
        </Typography>
        <Typography>
          Response Email Template Name:{" "}
          {data !== undefined
            ? findSelectedMailOpt(data?.responseEmailTemplate)
            : ""}
        </Typography>

        <br />
        
        {data?.tableRows?.length > 0 && <Typography variant="h6">Custom Fields</Typography>}
        <Typography>
          {data?.tableRows?.length > 0
            ? data?.tableRows.map((row, index) => (
                <div style={{ display: "flex" }}>
                  <Typography>Field Name: {row.fieldName}</Typography>
                  <Typography style={{ marginLeft: "5rem" }}>
                    Field Type: {row.fieldType}
                  </Typography>
                </div>
              ))
            : ""}
        </Typography>
        
        <br /><br />
        <Typography>
          Created on:{" "}
          {getDate(data?.createdAt, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Typography>Modified on: {getDate(data?.updatedAt, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            onClose();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

function ViewTemplateDetails({ open, handleClose, data, mailOptions }) {
  return (
    <div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        data={data}
        mailOptions={mailOptions}
      />
    </div>
  );
}

export default ViewTemplateDetails;
