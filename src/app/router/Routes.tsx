import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventForm from "../../features/events/forms/EventForm";
import EventDashBoard from "../../features/events/dashboard/EventDashboard";
import EventDetailedPage from "../../features/events/details/EventDetailedPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            { path: '/events', element:<EventDashBoard />},
            { path: '/events/:id', element:<EventDetailedPage />},
            { path: '/manage/:id', element:<EventForm />},
            { path: '/createEvent/', element:<EventForm />}
        ]
    }
])