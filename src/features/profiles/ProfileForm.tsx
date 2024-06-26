import { useFireStore } from "../../app/hooks/firestore/useFirestore"
import { FieldValues, useForm } from "react-hook-form"
import { Profile } from "./profile"
import { updateProfile } from "firebase/auth"
import { auth } from "../../app/config/firebase"
import { Button, Form } from "semantic-ui-react"

type Props = {
    profile: Profile
    setEditMode: (value: boolean) => void
}

export default function ProfileForm({ profile, setEditMode }: Props) {
    const { update } = useFireStore('profiles')
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
        mode: 'onTouched',
        defaultValues: {
            displayName: profile.displayName,
            description: profile.description
        }
    })

    async function onSubmit(data: FieldValues) {
        await update(profile.id, data)
        if (profile.displayName != data.displayName) {
            await updateProfile(auth.currentUser!, {
                displayName: data.displayName
            })
        }
        setEditMode(false)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Input
                placeholer='Display Name'
                {...register('displayName', { required: true })}
                error={errors.displayName && 'Display Name is required'}
            />

            <Form.TextArea
                placeholer='Tell us about yourself'
                {...register('description')}
            />

            <Button
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                floated='right'
                size='large'
                type='submit'
                positive
                content='Update Profile'
            >
            </Button>
        </Form>
    )
}