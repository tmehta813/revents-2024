import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../forms/EventForm";
import { sampleData } from "../../../app/api/sampleData";
import { useEffect, useState } from "react";
import { AppEvent } from "../../../app/types/event";

type Props = {
    formOpen: boolean,
    setFormOpen: (value: boolean) => void
    selectEvent: (event: AppEvent | null) => void
    selectedEvent: AppEvent | null
}

export default function EventDashBoard({ formOpen, setFormOpen, selectEvent, selectedEvent }: Props) {

    const [events, setEvents] = useState<AppEvent[]>([])
   
    useEffect(() => {
        setEvents(sampleData)
    }, [])

    function addEvents(event: AppEvent) {
        setEvents(prevState => {
            return [...prevState, event]
        })
    }

    function updateEvents(event:AppEvent){
        setEvents(events.map(evt =>event.id == evt.id ? event: evt))
        selectEvent(null)
        setFormOpen(false)
    }

    function deleteEvent(prevEvent : AppEvent){
        setEvents(events.filter(evnt => evnt.id!=prevEvent.id))
    }

    return (
        <Grid >
            <Grid.Row>
                <Grid.Column width={10}>
                    <EventList
                        deleteEvent = {deleteEvent}
                        selectEvent={selectEvent}
                        events={events}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    {formOpen && <EventForm
                        key={selectedEvent ? selectedEvent.id : 'create'}
                        selectedEvent={selectedEvent}
                        setFormOpen={setFormOpen}
                        updateEvent = {updateEvents}
                        addEvent={addEvents} />}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}