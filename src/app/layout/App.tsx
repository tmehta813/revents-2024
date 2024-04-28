import { Container } from "semantic-ui-react";
import EventDashBoard from "../../features/events/dashboard/EventDashboard";
import NavBar from "./nav/NavBar";
import { useState } from "react";
import { AppEvent } from "../types/event";

function App() {

  const [formOpen, setFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null)

  function handleSelectEvent(event: AppEvent | null){
    setSelectedEvent(event)
    setFormOpen(true)
   }

function hanleCreateForOpen(){
  setSelectedEvent(null)
  setFormOpen(true)
}

  return (
    <>
      <NavBar setFormOpen={hanleCreateForOpen}/>
       <Container className="main" >
         <EventDashBoard 
          selectEvent = {handleSelectEvent}
          selectedEvent = {selectedEvent}
          formOpen = {formOpen} 
          setFormOpen= {setFormOpen} />
      </Container>
      </>

  );
}

export default App;