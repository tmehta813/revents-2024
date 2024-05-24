import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedOutButtons from "./SignedOutButtons";
import SignedInMenu from "./SignedInMenu";
import { useAppSelector } from "../../store/store";
export default function NavBar() {
  const { authenticated } = useAppSelector(state => state.auth)

  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to='/'>
          <img src="/logo.png" alt="logo" />
          Your Guide
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
          />
          
        </Menu.Item>
        {authenticated ? <SignedInMenu /> : <SignedOutButtons />}

      </Container>
    </Menu>
  )
}
