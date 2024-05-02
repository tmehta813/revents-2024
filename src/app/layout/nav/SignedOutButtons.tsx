import { Button, Menu } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../common/modals/modalSlice";

type props = {
    setAuth: (value: boolean) => void
}

export default function SignedOutButtons() {

    const dispatch = useAppDispatch()
    return (
        <Menu.Item position="right">
            <Button onClick={()=> {dispatch(openModal({type:'LoginForm'}))}} basic inverted content='Login' />
            <Button basic inverted content='Register' style={{ marginLeft: '0.5em' }} />
        </Menu.Item>
    )
}