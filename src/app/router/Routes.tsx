import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventForm from "../../features/events/forms/EventForm";
import EventDashBoard from "../../features/events/dashboard/EventDashboard";
import EventDetailedPage from "../../features/events/details/EventDetailedPage";
import Scratch from "../../features/scratch/Scratch";
import AccountPage from "../../features/auth/AccountPage";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import UnAuthCoponent from "../layout/UnAuthCoponent";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth /> , children: [
                { path: '/manage/:id', element: <EventForm /> },
                { path: '/createEvent/', element: <EventForm key='create' /> },
                { path: '/profiles/:id', element: <ProfilePage /> },
                { path: '/account', element: <AccountPage /> },
            ]},
            { path: '/events', element: <EventDashBoard /> },
            { path: '/events/:id', element: <EventDetailedPage /> },
            { path: '/scratch/', element: <Scratch /> },
            { path: '/unauthorised', element: <UnAuthCoponent /> }
        ]
    }
])