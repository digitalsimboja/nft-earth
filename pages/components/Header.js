import React from "react";
import { Box, Menu } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";

export default function Header({ words, setIsDrawerOpen }) {
    return (
        <Box mb={12}>
            <Box className="address-box">
                <span className="red-slashes">Map Loading...</span> {words}
                <Box className="menu-button">
                     
                </Box>
            </Box>
        </Box>
    )
}
