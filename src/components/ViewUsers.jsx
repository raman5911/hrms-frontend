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

function SimpleDialog({ onClose, open, data }) {
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
        <div>
          <Typography>Employee ID: {data?.Employee_Id}</Typography>
          <Typography>Company: {data?.Company}</Typography>
          <Typography>Full Name: {data?.Employee_details?.name}</Typography>
          <Typography>Gender: {data?.Employee_details?.gender}</Typography>
          <Typography>
            Contact Number: {data?.Employee_details?.contact}
          </Typography>
          <Typography>
            Email Address: {data?.Employee_details?.email}
          </Typography>
        </div>

        <br />

        <div>
          <Typography variant="h6">Personal Details</Typography>

          <Typography>PAN Number: {data?.Personal_details?.pan}</Typography>
          <Typography>
            Aadhar Number: {data?.Personal_details?.aadharcard}
          </Typography>
          <Typography>
            Personal Email: {data?.Personal_details?.personal_email}
          </Typography>
          <Typography>DOB: {data?.Personal_details?.date_of_birth}</Typography>
        </div>

        <br />

        <div>
          <Typography variant="h6">Temporary Address</Typography>

          <Typography>State: {data?.Personal_details?.state}</Typography>
          <Typography>City: {data?.Personal_details?.city}</Typography>
          <Typography>Pin Code: {data?.Personal_details?.pin_code}</Typography>
          <Typography>
            Address Line 1: {data?.Personal_details?.address_line1}
          </Typography>
          <Typography>
            Address Line 2: {data?.Personal_details?.address_line2}
          </Typography>
        </div>

        <br />

        <div>
          <Typography variant="h6">Permanent Address</Typography>

          <Typography>State: {data?.Permanent_address?.state}</Typography>
          <Typography>City: {data?.Permanent_address?.city}</Typography>
          <Typography>Pin Code: {data?.Permanent_address?.pin_code}</Typography>
          <Typography>
            Address Line 1: {data?.Permanent_address?.address_line1}
          </Typography>
          <Typography>
            Address Line 2: {data?.Permanent_address?.address_line2}
          </Typography>
        </div>

        <br />

        <div>
          <Typography variant="h6">Other Details</Typography>

          <Typography>Marital Status: {data?.marital_status}</Typography>
          <Typography>Passport: {data?.passport}</Typography>
          <Typography>Father's Name: {data?.father_name}</Typography>
          <Typography>Mother's Name: {data?.mother_name}</Typography>
          <Typography>Blood Group: {data?.blood_group}</Typography>
        </div>

        <br />

        <div>
          <Typography variant="h6">Official Details</Typography>

          <Typography>Role: {data?.Official_details?.role}</Typography>
          <Typography>
            Designation: {data?.Official_details?.designation}
          </Typography>
          <Typography>
            Department: {data?.Official_details?.department}
          </Typography>
          <Typography>
            Reporting Manager: {data?.Official_details?.reporting_manager}
          </Typography>
          <Typography>
            Direct Reportees:
            {data?.Official_details?.direct_reportees.length > 0
              ? data?.Official_details?.direct_reportees.map((row, index) => (
                  <span key={index}>
                    {row}
                    {index ==
                    data?.Official_details?.direct_reportees.length - 1
                      ? ""
                      : ","}{" "}
                  </span>
                ))
              : " None"}
          </Typography>
          {/* <Typography>
            Joining Date:{" "}
            {Object.prototype.toString.call(
              data?.Official_details?.joining_date
            ) === "[object Date]"
              ? getDate(data?.Official_details?.joining_date, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : data?.Official_details?.joining_date}
          </Typography> */}

          <Typography>
            Joining Date:{" "}
            {new Date(data?.Official_details?.joining_date).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </Typography>

          <Typography>
            Employee Status: {data?.Official_details?.employee_status}
          </Typography>
          <Typography>
            Payroll Type: {data?.Official_details?.payroll_type}
          </Typography>
        </div>

        <br />

        <div>
          <Typography variant="h6">Bank Details</Typography>

          <Typography>
            Account Name: {data?.account_details?.bank_details?.account_name}
          </Typography>
          <Typography>
            Account Number:{" "}
            {data?.account_details?.bank_details?.account_number}
          </Typography>
          <Typography>
            IFSC Code: {data?.account_details?.bank_details?.Ifsc_code}
          </Typography>
          <Typography>
            ESI Number: {data?.account_details?.esi_number}
          </Typography>
          <Typography>PF Number: {data?.account_details?.pf_number}</Typography>
        </div>

        <br />
        <br />
        {/* <Typography>
          Created on:{" "}
          {Object.prototype.toString.call(
              data?.createdAt
            ) === "[object Date]"
              ? getDate(data?.createdAt, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : data?.createdAt}
        </Typography> */}

        <Typography>
          Created on:{" "}
          {new Date(data?.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short",
          })}
        </Typography>

        {/* <Typography>
          Modified on:{" "}
          {getDate(data?.updatedAt, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography> */}
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

function ViewUsers({ open, handleClose, data }) {
  console.log(data);

  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} data={data} />
    </div>
  );
}

export default ViewUsers;
