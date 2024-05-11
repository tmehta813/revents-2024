import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventForm from "../../features/events/forms/EventForm";
import EventDashBoard from "../../features/events/dashboard/EventDashboard";
import EventDetailedPage from "../../features/events/details/EventDetailedPage";
import Scratch from "../../features/scratch/Scratch";
import AccountPage from "../../features/auth/AccountPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            { path: '/events', element:<EventDashBoard />},
            { path: '/events/:id', element:<EventDetailedPage />},
            { path: '/manage/:id', element:<EventForm />},
            { path: '/createEvent/', element:<EventForm key = 'create' />},
            { path: '/account', element:<AccountPage />},
            { path: '/scratch/', element:<Scratch />}
        ]
    }
])