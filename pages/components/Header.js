import React from "react";
import { Box } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";

export default function Header({ words, setIsDrawerOpen }) {
  return (
    <Box mb={12}>
      <Box className="address-box">
        <span className="red-slashes">Map Loading...</span> {words}
        <Box className="menu-button">
          {/* <IconButton aria-label="open side menu"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ background: '#fff' }} /> */}
        </Box>
      </Box>
    </Box>
  );
}
