import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedOutButtons from "./SignedOutButtons";
import SignedInMenu from "./SignedInMenu";
import { useState } from "react";

export default function NavBar() {

  const [auth, setAuth] = useState(false)

  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to='/'>
          <img src="/logo.png" alt="logo" />
          Transition
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} to='/events' />
        <Menu.Item name="Scratch" as={NavLink} to='/scratch' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/createEvent'
            floated="right"
            positive={true}
            content='Create Event'
          >
          </Button>
        </Menu.Item>
        {auth ? <SignedInMenu setAuth={setAuth} /> : <SignedOutButtons setAuth={setAuth}/>}

      </Container>
    </Menu>
  )
}
