import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/common/modals/modalSlice";
import { Button, Form } from "semantic-ui-react";
import { signin } from "./authSlice";

export default function LoginForm() {
    const { register, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
        mode: 'onTouched'
    })

    const dispatch = useAppDispatch()

    function onSubmit(data: FieldValues) {
        console.log(data)
        dispatch(signin(data))
        dispatch(closeModal())
    }

    return (
        <ModalWrapper header='Sign into GuideGuru'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    defaultValue=''
                    placeholder='Email address'
                    {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})}
                    error={
                        errors.email?.type==='required' && 'Email is required' || 
                    errors.email?.type==='pattern' && 'Email is invalid'}
                />

                <Form.Input
                    type='password'
                    defaultValue=''
                    placeholder='Password'
                    {...register('password', { required: true })}
                    error={errors.password && 'Password is required'}
                />

                <Button
                    disabled={!isValid || !isDirty}
                    loading={isSubmitting}
                    type='submit'
                    fluid
                    size='large'
                    color='teal'
                    content='Login'
                />

            </Form>
        </ModalWrapper>
    )
}