import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


const DisplayRequestedToMe = ({ requestsData }) => {
  console.log(requestsData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Applied For</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { requestsData!= undefined ? requestsData.map((data, index) => (
            <TableRow
              key={data.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell>{data.req_type}</TableCell>
              <TableCell>{data.reason}</TableCell>
              <TableCell>
                  <Button variant="contained" sx={{mr: 2}}>View</Button>
                  <Button variant="contained" color='success' sx={{mr: 2}}>Approve</Button>
                  <Button variant="contained" color='error' sx={{mr: 2}}>Reject</Button>
              </TableCell>
            </TableRow>
          )) : (
            <p style={{ textAlign: "center" }}> No requests available. </p>
          ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const DisplayAppliedByMe = ({ requestsData }) => {
  console.log(requestsData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>Approver Name</TableCell>
            <TableCell>Applied For</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Applied on</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { requestsData!= undefined ? requestsData.map((data, index) => (
            <TableRow
              key={data.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell>{data.req_type}</TableCell>
              <TableCell>{data.reason}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>{data.applied_on}</TableCell>
            </TableRow>
          )) : (
            <p style={{ textAlign: "center" }}> No requests available. </p>
          ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export {DisplayRequestedToMe, DisplayAppliedByMe};