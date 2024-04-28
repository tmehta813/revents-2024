import { Grid } from "semantic-ui-react";
import EventDetailedInfo from "./EventDetailedInfo";

import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";

export default function EventDetailedPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
       <EventDetailedHeader/>
       <EventDetailedInfo/>
       <EventDetailedChat/>
      </Grid.Column>
      <Grid.Column width = {6} >
      <EventDetailedSidebar/>
      </Grid.Column>
    </Grid>
  )
}