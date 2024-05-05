import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../app/store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { AppEvent } from "../../../app/types/event";
import { toast } from "react-toastify";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "../eventSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Timestamp } from "firebase/firestore";

export default function EventForm() {

    const { loadDocument, create, update, remove } = useFireStore('events')

    const { register, control, setValue, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        mode: 'onTouched',
        defaultValues: async () => {
            if (event) {
                // Return a Promise resolving to the default values object
                return Promise.resolve({ ...event, date: new Date(event.date) });
            }
            // Return null or an empty object if event is false
            return null;
        }
    });

    const { id } = useParams();
    const event = useAppSelector(state => state.events.data?.find(e => e.id === id));
    const { status } = useAppSelector(state => state.events)
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        loadDocument(id, actions)
    }, [id, loadDocument])

    async function updateEvent(data: AppEvent) {
        if (!event) return
        await update(data.id, {
            ...data,
            date: Timestamp.fromDate(data.date as unknown as Date)
        })
    }

    async function createEvent(data: FieldValues) {
        const ref = await create({
            ...data,
            hostedBy: "Tarun",
            attendees: [],
            hostPhotoURL: '',
            date: Timestamp.fromDate(data.date as unknown as Date)

        })
        return ref
    }

    async function onSubmit(data: FieldValues) {
        try {
            if (event) {
                await updateEvent({ ...event, ...data })
                navigate(`/events/${event.id}`)
            }
            else {
                const ref = await createEvent(data)
                navigate(`/events/${ref?.id}`)
            }
        } catch (error: any) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    async function handleCancelToggle(event: AppEvent) {
        if (!event) return
        await update(event.id, {
            isCancelled: !event.isCancelled
        })
        toast.success(`Event has been ${event.isCancelled ? 'uncancelled' : 'cancelled'}`)
    }

    if (status === 'loading') {
        return <LoadingComponent />;
    }

    return (
        <Segment clearing>
            <Header content='Event Details' sub color='teal'></Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    defaultValue={event?.title || ''}
                    placeholder="Event Title"
                    {...register('title', { required: 'Title is required' })}
                    error={errors.title && errors.title.message}
                />

                <Controller
                    name='category'
                    control={control}
                    rules={{ required: 'Category is required' }}
                    defaultValue={event?.category}
                    render={({ field }) => (
                        <Form.Select
                            options={categoryOptions}
                            placeholder="Category"
                            clearable
                            {...field}
                            onChange={(_, d) => setValue('category', d.value, { shouldValidate: true })}
                            error={errors.category && errors.category.message}
                        />

                    )}
                />
                <Form.TextArea
                    defaultValue={event?.description || ''}
                    placeholder="Description"
                    {...register('description', { required: 'Description is required' })}
                    error={errors.description && errors.description.message}
                />
                <Header sub content='Location details' color='teal' />
                <Form.Input
                    defaultValue={event?.city || ''}
                    placeholder="City"
                    {...register('city', { required: 'City is required' })}
                    error={errors && errors.city?.message}
                />
                <Form.Input
                    defaultValue={event?.venue || ''}
                    placeholder="Venue"
                    {...register('venue', { required: 'Venue is required' })}
                    error={errors.venue && errors.venue.message}
                />

                <Form.Field>
                    <Controller
                        name='date'
                        control={control}
                        rules={{ required: 'Date is required' }}
                        defaultValue={event && event.date || null}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={value => setValue('date', value, { shouldValidate: true })}
                                showTimeSelect
                                timeCaption='time'
                                dateFormat='MMM d, yyyy h:mm aa'
                                placeholderText='Event date and time'
                            />
                        )}
                    />
                </Form.Field>

                {event && (
                    <Button
                        type='button'
                        floated='left'
                        content = {event.isCancelled? 'Reactivate event': 'Cancel event'}
                        color={event.isCancelled ? 'green' : 'red'}
                        onClick={() => handleCancelToggle(event)}
                    ></Button>
                )}

                <Button
                    loading={isSubmitting}
                    disabled={!isValid} 
                    type='submit' floated="right" positive content='Submit' />
                <Button disabled={isSubmitting} as={Link} to={'/events'} type='button' floated="right" content='Cancel' />
            </Form>
        </Segment>
    )
}