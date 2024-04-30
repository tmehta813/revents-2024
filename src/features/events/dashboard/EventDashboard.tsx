import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../app/store/store";

export default function EventDashBoard() {

    const {events} = useAppSelector(state => state.events)

    return (
        <Grid >
            <Grid.Row>
                <Grid.Column width={10}>
                    <EventList
                        events={events}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <h2>Filter</h2>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}