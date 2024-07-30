import { Box, Typography } from "@mui/material";
import React from "react";
import { LoaderCircle } from "lucide-react";

const Shimmer = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      position="relative"
    >
      <style>
        {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
  
            .animate-spin {
              animation: spin 2s linear infinite;
            }
          `}
      </style>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="absolute"
      >
        <LoaderCircle className="animate-spin" style={{ fontSize: 50 }} />
        <Typography variant="h6" mt={2}>
          Loading
        </Typography>
      </Box>
    </Box>
  );
};

export default Shimmer;
