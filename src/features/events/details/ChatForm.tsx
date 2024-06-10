import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Form, Loader } from "semantic-ui-react";
import { KeyboardEvent } from "react";
import { push, ref, set } from "firebase/database";
import { auth, fb } from "../../../app/config/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";

type Props = {
    eventId: string
    parentId?: string | null
    setReplyForm? : (value: any) => void
}

export default function ChatForm({eventId, parentId, setReplyForm}: Props) {

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        mode: 'onTouched',
        defaultValues: { comment: '' }
    })
    const {authenticated} = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const location = useLocation()

    async function onSubmit(data: FieldValues) {
        if (!authenticated) return navigate('/unauthorised', {state: {from: location.pathname}})
    
        try {
            const charRef = ref(fb, `chat/${eventId}`)
            const newChatRef = push(charRef)
            await set(newChatRef, {
                displayName: auth.currentUser?.displayName,
                photoURL: auth.currentUser?.photoURL,
                uid: auth.currentUser?.uid,
                text: data.comment,
                date: Date.now(),
                parentId: parentId || null
            })
            if(parentId && setReplyForm) setReplyForm({open: false, commentId: null})
            reset()
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.TextArea
                {...register('comment', { required: true })}
                placeholder='Enter your comment (Enter to submit, SHIFT + Enter to add new line)'
                onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === 'Enter' && e.shiftKey) {
                        return;
                    }
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(onSubmit)();
                    }
                }}
                
            />

            <Loader active={isSubmitting}> </Loader>
        </Form >

    )
}