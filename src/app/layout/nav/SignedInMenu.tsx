import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";

type Props = {
    setAuth: (value: boolean) => void
}

export default function SignedInMenu({ setAuth }: Props) {
    const navigate = useNavigate()

    function handleSignout(){
        console.log('sign out clicked')
        setAuth(false)
        navigate('/')
    }

    return (
        <Menu.Item position='right'>
            <Image avatar spaced='right' src='/user.png'> </Image>
            <Dropdown pointing='top left' text='Bob'>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' ></Dropdown.Item>
                    <Dropdown.Item text='My Profile' icon='user' ></Dropdown.Item>
                    <Dropdown.Item onClick={handleSignout} text='Sign out' icon='power' ></Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>
        </Menu.Item>
    )
}