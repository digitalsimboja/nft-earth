import dynamic from "next/dynamic";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    loading: () => "Loading...",
    ssr: false,
  });

  return (
    <Box width={"100vw"}>
      <Navbar bg={useColorModeValue("white", "gray.800")} />
      <MapWithNoSSR />
    </Box>
  );
}
