import React from "react";
import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Drawer } from "@chakra-ui/react";

export default function SideMenu(isOpen, setIsOpen) {
  return (
    <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={{ padding: "0.5rem", paddingTop: "2rem" }}>
        <ConnectButton />
      </Box>
    </Drawer>
  );
}
