import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDetailsPage from "../../features/events/details/EventDetailsPage";
import EventForm from "../../features/events/forms/EventForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            { path: '/events', element:<EventDashBoard />},
            { path: '/events/:id', element:<EventDetailsPage />},
            { path: '/manage/:id', element:<EventForm />},
            { path: '/createEvent/', element:<EventForm />}
        ]
    }
])