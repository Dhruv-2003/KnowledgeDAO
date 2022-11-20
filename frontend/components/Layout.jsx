import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import Image from "next/image";
import React, { Children } from "react";
import logo from '../assets/navlogo.png'

export default function Layout({ children }) {
  return (
    <div>
      <Navbar fluid={true} rounded={false}>
        <Navbar.Brand href="/">
          <Image
            src={logo}
            className="w-10"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            KnowledgeDAO
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Flowbite >
            <DarkThemeToggle className="mx-3" />
          </Flowbite>
          {/* <Button>Get started</Button> */}
          <ConnectButton />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/publish">Publish</Navbar.Link>
          <Navbar.Link href="/explore">Explore</Navbar.Link>
          <Navbar.Link href="/vote">Vote</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {children}
    </div>
  );
}
