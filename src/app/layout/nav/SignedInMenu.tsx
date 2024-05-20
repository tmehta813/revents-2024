import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { useAppSelector } from "../../store/store";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

export default function SignedInMenu() {
    const navigate = useNavigate()
    const { currentUser } = useAppSelector(state => state.auth)

    async function handleSignout() {
        await signOut(auth)
        navigate('/')
    }

    return (
        <Menu.Item position='right'>
            <img
                alt="avatar"
                src={currentUser?.photoURL || '/user.png'}
                style={{ borderRadius: '50%', width: 25, height: 25, marginRight: 10 }}
            />
            <Dropdown pointing='top left' text={currentUser.email}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' ></Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/profiles/${auth.currentUser?.uid}`} text='My Profile' icon='user' ></Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/account'} text='My Accounts' icon='settings' ></Dropdown.Item>
                    <Dropdown.Item onClick={handleSignout} text='Sign out' icon='power' ></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </Menu.Item>
    )
}