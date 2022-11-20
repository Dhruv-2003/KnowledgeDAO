import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import React, { Children } from "react";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar fluid={true} rounded={false}>
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Flowbite>
            <DarkThemeToggle className="mx-3" />
          </Flowbite>
          <Button>Get started</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/publish">Publish</Navbar.Link>
          <Navbar.Link href="/explore">Explore</Navbar.Link>
          <Navbar.Link href="/vote">Vote</Navbar.Link>
          <Navbar.Link href="/navbars">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {children}
    </div>
  );
}
