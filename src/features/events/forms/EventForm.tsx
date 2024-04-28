import { ChangeEvent, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import { createId } from "@paralleldrive/cuid2";

type Props = {
    setFormOpen: (value: boolean) => void;
    addEvent :(value: AppEvent) => void;
    selectedEvent: AppEvent | null;
    updateEvent :(event: AppEvent) => void;
}

export default function EventForm({setFormOpen, addEvent, selectedEvent, updateEvent}: Props) {

    const initialValues = selectedEvent ?? {
        title : '',
        category : '',
        description : '',
        city: '',
        venue : '',
        date : ''
    }

    const [values, setValues] = useState(initialValues)

    function onSubmit(){
        selectedEvent ? 
            updateEvent({...selectedEvent, ...initialValues})
        : addEvent({...values, id: createId(), hostedBy: 'tarun', attendees : [], hostPhotoURL: '' })
        setFormOpen(false)
    }

    function handleInputChange(e : ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target
        setValues({...values,[name]:value})
    }

  return (
    <Segment clearing>
        <Header content = {selectedEvent? 'Update Event' : 'Create Event'}></Header>
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
            <Button type ='button' onClick={ () => {setFormOpen(false)}} floated= "right" content = 'Cancel' />
        </Form>
    </Segment>
  )
}