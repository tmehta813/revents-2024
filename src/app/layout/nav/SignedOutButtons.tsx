import { Button, Menu } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../common/modals/modalSlice";

export default function SignedOutButtons() {

    const dispatch = useAppDispatch()
    return (
        <Menu.Item position="right">
            <Button onClick={() => { dispatch(openModal({ type: 'LoginForm' })) }} basic inverted content='Login' />
            <Button basic
                onClick={() => { dispatch(openModal({ type: 'RegisterForm' })) }}
                inverted content='Register' style={{ marginLeft: '0.5em' }} />
        </Menu.Item>
    )
}