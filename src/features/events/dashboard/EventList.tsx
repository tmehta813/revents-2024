import { AppEvent } from "../../../app/types/event";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
};

export default function EventList({ events }: Props) {
  // Check if events is undefined or null
  if (!events) {
    return null; // or render a loading indicator or placeholder
  }

  return (
    <>
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </>
  );
}
