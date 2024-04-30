import { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { createEvent, updateEvent } from "../eventSlice";
import { createId } from "@paralleldrive/cuid2";


export default function EventForm() {

    let {id}  = useParams();
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
    
    function onSubmit() {
        const eventId = id ?? createId(); // Corrected comparison
    
        console.log(values); // Changed to values instead of initialValues
        if (event) {
            dispatch(updateEvent({...event, ...values}));
        } else {
            dispatch(createEvent({...values, id: eventId, hostedBy: "Tarun", attendees: [], hostPhotoURL: ''}));
        }
        navigate(`/events/${eventId}`);
    }
    
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setValues({...values, [name]: value}); // Use functional update
    }

  return (
    <Segment clearing>
        <Header content = {event?'Create Event':'Update Event'}></Header>
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <input 
                onChange={e => handleInputChange(e)}
                type="text" 
                name="title"
                value={values.title}
                placeholder="Event Title"
                />
            </Form.Field>
            <Form.Field>
                <input 
                onChange={e => handleInputChange(e)}
                type="text" 
                name="category"
                value={values.category}
                placeholder="Category"/>
            </Form.Field>
            <Form.Field>
            <input 
                onChange={e => handleInputChange(e)}
                type="text" 
                name="description"
                value={values.description} 
                placeholder="Description"/>
            </Form.Field>
            <Form.Field>
            <input 
                onChange={e => handleInputChange(e)}
                type="text" 
                name="city"
                value={values.city} 
                placeholder="City"/>
            </Form.Field>
            <Form.Field>
            <input 
                onChange={e => handleInputChange(e)}
                type="text" 
                name="venue"
                value={values.venue}
                placeholder="Venue"/>
            </Form.Field>
            <Form.Field>
            <input 
                onChange={e => handleInputChange(e)}
                type="date" 
                name="date"
                value={values.date}
                placeholder="Date"/>
            </Form.Field>

            <Button type ='submit'  floated= "right" positive content = 'Submit' />
            <Button as = {Link} to = {'/events'} type ='button' floated= "right" content = 'Cancel' />
        </Form>
    </Segment>
  )
}