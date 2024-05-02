import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signout } from "../../../features/auth/authSlice";

export default function SignedInMenu() {
    const navigate = useNavigate()
    const {currentUser} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    function handleSignout(){
        console.log('sign out clicked')
        dispatch(signout())
        navigate('/')
    }

    return (
        <Menu.Item position='right'>
            <Image avatar spaced='right' src='/user.png'> </Image>
            <Dropdown pointing='top left' text= {currentUser.email}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' ></Dropdown.Item>
                    <Dropdown.Item text='My Profile' icon='user' ></Dropdown.Item>
                    <Dropdown.Item onClick={handleSignout} text='Sign out' icon='power' ></Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>
        </Menu.Item>
    )
}