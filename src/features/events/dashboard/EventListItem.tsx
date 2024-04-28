import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/event";

type Props = {
    event: AppEvent
    selectEvent: (event: AppEvent) => void
    deleteEvent : (event : AppEvent) => void
}

export default function EventListItem({ event, selectEvent, deleteEvent}: Props) {
    return (
        <SegmentGroup>
            <Segment>
                <ItemGroup>
                    <Item>
                        <Item.Image size='tiny' circular src={event.hostPhotoURL}></Item.Image>
                        <Item.Content>
                            <Item.Header>
                                {event.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted By {event.hostedBy}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {event.date}
                    <Icon name='marker' /> {event.venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {event.attendees?.map(attendee => (
                        <EventListAttendee key={attendee.id} attendee={attendee} />
                    ))}
                </List>
            </Segment>
            <Segment clearing>
                <span>{event.description}</span>
                <Button color='red' floated='right' onClick={() => deleteEvent(event)} content = 'Delete'/> 
                <Button color='teal' floated='right' onClick={() => selectEvent(event)} content = 'View'/>
            </Segment>
        </SegmentGroup>
    )
}