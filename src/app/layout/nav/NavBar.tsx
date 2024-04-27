import { Button, Container, Menu } from "semantic-ui-react";


type Props = {
  setFormOpen: (value: boolean) => void;
}

export default function NavBar({setFormOpen}: Props) {
  return (
    <Menu inverted = {true} fixed="top">
        <Container>
            <Menu.Item header>
            <img src= "/logo.png" alt = "logo"/>
             Transition
            </Menu.Item>
            <Menu.Item name="Events"/>
            <Menu.Item>
            <Button 
              onClick={()=>setFormOpen(true)}
              floated="right" 
              positive = {true} 
              content = 'Create Event'
            >
            </Button>
            </Menu.Item>
            <Menu.Item position="right">
                <Button basic inverted content = 'Login'/>
                <Button basic inverted content = 'Register' style = {{marginLeft: '0.5em'}}/>
            </Menu.Item>
        </Container>
    </Menu>
  )
}
