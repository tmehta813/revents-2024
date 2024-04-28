import { AppEvent } from "../../../app/types/event";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
  selectEvent : (event: AppEvent) => void
  deleteEvent : (event: AppEvent) => void
}

export default function EventList({ events, selectEvent, deleteEvent}: Props) {
  return (
    <>
      {events.map(event => (
        <EventListItem 
         deleteEvent = {deleteEvent}
        selectEvent = {selectEvent}
        key={event.id} 
        event={event} />
      ))}
    </>
  );
}