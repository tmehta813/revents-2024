import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedOutButtons from "./SignedOutButtons";
import SignedInMenu from "./SignedInMenu";
import { useAppSelector } from "../../store/store";
import { sampleData } from "../../api/sampleData";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function NavBar() {
  const { authenticated } = useAppSelector(state => state.auth)

  function seedData() {
    console.log("seed clicked")
    sampleData.forEach(async event => {
      const { id, ...rest } = event;
      await setDoc(doc(db, 'events', id), {
        ...rest
      })
    })
  }

  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to='/'>
          <img src="/logo.png" alt="logo" />
          GuideGuru
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
        {import.meta.env.DEV && (
          <MenuItem>
            <Button
              inverted
              color='teal'
              onClick={() => { seedData() }}
              content='Seed Data'
            ></Button>
          </MenuItem>
        )}
        {authenticated ? <SignedInMenu /> : <SignedOutButtons />}

      </Container>
    </Menu>
  )
}
