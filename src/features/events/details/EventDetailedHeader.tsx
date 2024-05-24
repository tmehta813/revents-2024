import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/event";
import { useAppSelector } from "../../../app/store/store";
import { toast } from "react-toastify";
import { useState } from "react";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";

type Props = {
    event: AppEvent
}



export default function EventDetailedHeader({ event }: Props) {

    const { currentUser } = useAppSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const { update } = useFireStore('events')

    async function toggleAttendance() {
        if (!currentUser) {
            toast.error('Must be loggedin to do this')
            return
        }
        setLoading(true)
        if (event.isGoing) {
            const attendee = event.attendees.find(x => x.id === currentUser.uid)
            await update(event.id, {
                attendees: arrayRemove(attendee),
                attendeeIds: arrayRemove(currentUser?.uid)
            })
        } else {
            await update(event.id, {
                attendees: arrayUnion({
                    id: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                }),
                attendeeIds: arrayUnion(currentUser.uid)
            })
        }
        setLoading(false)
    }


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

            <Segment attached="bottom" clearing>
                {event.isHost ? (
                    <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
                        Manage Event
                    </Button>
                ) : <Button
                    loading={loading}
                    onClick={() => toggleAttendance()}
                    color={event.isGoing ? 'grey' : 'teal'}
                    content={event?.isGoing ? 'Cancel' : 'JOIN THIS EVENT'}></Button>}
            </Segment>
        </Segment.Group>
    )
}