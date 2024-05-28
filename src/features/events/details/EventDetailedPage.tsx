import { Grid } from "semantic-ui-react";
import EventDetailedInfo from "./EventDetailedInfo";

import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { actions } from "../eventSlice";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";

export default function EventDetailedPage() {

  const { id } = useParams()
  const event = useAppSelector(state => state.events.data?.find(e => e.id === id));
  const { status } = useAppSelector(state => state.events)
  const { loadDocument } = useFireStore('events')

  useEffect(() => {
    if (!id) return
    loadDocument(id, actions)

  }, [id, loadDocument]);

  if (status === 'loading') return <LoadingComponent />

  if (!event) return <h2>Event not found</h2>
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId = {event.id} />
      </Grid.Column>
      <Grid.Column width={6} >
        <EventDetailedSidebar event = {event} />
      </Grid.Column>
    </Grid>
  )
}