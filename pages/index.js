import { useEffect, useState } from "react";
import dynamic from "next/dynamic"
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";
import Head from 'next/head';


import styles from '../styles/Home.module.css'

const EarthMap = dynamic(() => import("./components/Map"), { ssr: false })
const DEFAULT_CENTER = [38.907132, -77.036546]

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Box width={"100vw"}  >
      {/* Add the Navbar */}
      <Navbar bg={useColorModeValue("white", "gray.800")} />
      <div className={styles.container}>
        <Head>
          <title>Earth Map</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Earth NFT Map
          </h1>
          <EarthMap className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
     
          </EarthMap>


        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    </Box>

  )
}