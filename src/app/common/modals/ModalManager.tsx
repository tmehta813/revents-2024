import LoginForm from "../../../features/auth/LoginForm";
import TestModal from "../../../features/scratch/TestModal"
import { useAppSelector } from "../../store/store"

// Define a type for the modal lookup object
interface ModalLookup {
    [key: string]: React.ComponentType<any>; // You can refine the type based on your modal components
}

export default function ModalManager() {

    const modalLookup: ModalLookup = {
        TestModal,
        LoginForm
    }

    const { type, data, open } = useAppSelector(state => state.modals)

    let renderedModal;
    if (open && type) {
        const ModalComponent = modalLookup[type];
        if (ModalComponent) {
            renderedModal = <ModalComponent data={data} />;
        } else {
            console.error(`Modal component "${type}" not found in modalLookup`);
        }
    }

    return (
        <span>{renderedModal}</span>
    )
}
