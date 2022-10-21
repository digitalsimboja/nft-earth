import React from "react";
import dynamic from "next/dynamic";
import { Box, useColorModeValue } from "@chakra-ui/react";
import  Navbar from './components/Navbar'

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("./components/Map"), {
    ssr: false
  });

  return (
    
    <Box width={"100vw"}  >
      {/* Add the Navbar */}
      <Navbar bg={useColorModeValue("white", "gray.800")} />
      <div id="map">
        <MapWithNoSSR />
      </div>
    </Box>
  );
}