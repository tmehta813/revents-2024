import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";

type Props = {
  event : AppEvent
}

export default function EventDetailedHeader({event}: Props) {
  return (
    <Segment.Group>
    <Segment basic attached="top" style={{ padding: '0', backgroundColor: 'black' }}>
    <Image src={`/categoryImages/${event.category}.jpg`} fluid />
    <Segment basic>
        <Item.Group>
            <Item>
                <Item.Content>
                    <Header
                        size="huge"
                        content={event.title}
                        style={{ color: 'white', marginBottom: '0' }}
                    />
                    <p style={{ color: 'white', marginBottom: '0' }}>{event.date}</p>
                    <p style={{ color: 'white', marginBottom: '0' }}>
                        Hosted by <strong>{event.hostedBy}</strong>
                    </p>
                </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
</Segment>

    <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button as = {Link} to = {`/manage/${event.id}`} color="orange" floated="right">
            Manage Event
        </Button>
        
    </Segment>
</Segment.Group>
  )
}