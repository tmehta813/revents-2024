import { Button, Menu } from "semantic-ui-react";

type props = {
    setAuth: (value: boolean) => void
}

export default function SignedOutButtons({setAuth}:props) {
    return (
        <Menu.Item position="right">
            <Button onClick={()=> {setAuth(true)}} basic inverted content='Login' />
            <Button basic inverted content='Register' style={{ marginLeft: '0.5em' }} />
        </Menu.Item>
    )
}