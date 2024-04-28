import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";


export default function EventForm() {

    const initialValues = {
        title : '',
        category : '',
        description : '',
        city: '',
        venue : '',
        date : ''
    }

    const [values, setValues] = useState(initialValues)

    function onSubmit(){
        console.log(initialValues)
        // selectedEvent ? 
        //     updateEvent({...selectedEvent, ...initialValues})
        // : addEvent({...values, id: createId(), hostedBy: 'tarun', attendees : [], hostPhotoURL: '' })
        // setFormOpen(false)
    }

    function handleInputChange(e : ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target
        setValues({...values,[name]:value})
    }

  return (
    <Segment clearing>
        <Header content = {'Create Event'}></Header>
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