import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { address } = useAccount();

  // When the page loads, check if user is connected, and if connected,
  // useEffect(() => {
  //   async function showUserProfile() {
  //     return router.push(`profiles/${address}`);
  //   }
  //   if (isConnected) {
  //     showUserProfile();
  //   }
  // }, [router, address, isConnected]);

  return (
    <>
    
      <Box width={"100vw"} bg={useColorModeValue("gray.800", "gray: 800")} >
        {/* Add the Navbar */}
        <Navbar bg={useColorModeValue("white", "gray.800")} />
      </Box>
    </>
  );
}