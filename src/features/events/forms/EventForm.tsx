import { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { createEvent, updateEvent } from "../eventSlice";
import { createId } from "@paralleldrive/cuid2";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

export default function EventForm() {

    const { register, control, setValue, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm(
        {
            mode: 'onTouched'
        }
    )

    let { id } = useParams();
    const event = useAppSelector(state => state.events.events.find(e => e.id === id))
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const initialValues = event || {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    };

    const [values, setValues] = useState(initialValues);

    function onSubmit(data: FieldValues) {
        console.log(data)
        const eventId = id ?? createId(); // Corrected comparison
        if (event) {
            dispatch(updateEvent({ ...event, ...data, date: data.date.toString() }));
        } else {
            dispatch(createEvent({ ...data, date: data.date.toString(), id: eventId, hostedBy: "Tarun", attendees: [], hostPhotoURL: '' }));
        }
        navigate(`/events/${eventId}`);
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value }); // Use functional update
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
                            defaultValue={event?.category || ''}
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
                        defaultValue={event && new Date(event.date) || null}
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

                <Button
                    loading={isSubmitting}
                    disabled={!isValid} type='submit' floated="right" positive content='Submit' />
                <Button disabled={isSubmitting} as={Link} to={'/events'} type='button' floated="right" content='Cancel' />
            </Form>
        </Segment>
    )
}