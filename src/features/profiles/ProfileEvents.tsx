import { useEffect, useState } from "react";
import { Tab, TabPane } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Image } from "semantic-ui-react";
import { Profile } from "./profile";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useAppSelector } from "../../app/store/store";
import { CollectionOptions } from "../../app/hooks/firestore/types";
import { actions } from "../events/eventSlice";

type Props = {
    profile: Profile
}

export default function ProfileEvents({ profile }: Props) {
    const [activeTab, setActiveTab] = useState(0);
    const { loadCollection } = useFireStore('events')
    const {data: events, status } = useAppSelector(state => state.events)

    const initialOptions: CollectionOptions = {
        queries: [
            { attribute: 'attendeeIds', operator: 'array-contains', value: profile.id },
            { attribute: 'date', operator: '>=', value: new Date() }
        ],
        sort: { attribute: 'date', order: 'asc' }
    }
    const [options, setOptions] = useState<CollectionOptions>(initialOptions)

    function handleSetQuery(tab: number){
        let options : CollectionOptions = {} as CollectionOptions
        switch(tab){
            case 1:
                options.queries = [
                    { attribute: 'attendeeIds', operator: 'array-contains', value: profile.id },
                    { attribute: 'date', operator: '<', value: new Date() }
                ],
                options.sort = {attribute:'date', order: 'desc'}
                break;
            case 2:
                options.queries = [
                    { attribute: 'hostUid', operator: '==', value: profile.id }
                ],
                options.sort = {attribute:'date', order: 'asc'}
                break;
            default:
                options = initialOptions
                break;
        }

        setOptions(options)

    }

    useEffect(() => {
        loadCollection(actions, options)
    }, [loadCollection, options])

    const openProfileEvents = (
        <Grid>
            <Grid.Column width={16}>
                <Header floated='left' icon='calendar' content='Events' />
            </Grid.Column>
            <Grid.Column width={16}>
            <Card.Group itemsPerRow={4} style={{ marginTop: 10 }}>
                    {events && events.length > 0 ? events.map(event => (
                        <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                            <Image style={{ minHeight: 100, objectFit: 'cover' }} src={`/categoryImages/${event.category}.jpg`} />
                            <Card.Content>
                                <Card.Header content={event.title} textAlign='center' />
                                <Card.Meta textAlign='center'>
                                    <span>{new Date(event.date).toLocaleDateString()}</span>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    )) : <div>No event found</div>}
                </Card.Group>
            </Grid.Column>
        </Grid>)


    const panes = [
        { menuItem: 'Future events', render: () => <TabPane loading = {status === 'loading'} key='future'> {openProfileEvents}  </TabPane> },
        { menuItem: 'Past events', render: () => <TabPane loading = {status === 'loading'} key='past'>  {openProfileEvents} </TabPane> },
        { menuItem: 'Hosting', render: () => <TabPane loading = {status === 'loading'} key='hosting'> {openProfileEvents} </TabPane> }
    ];
    return (
        <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            activeIndex={activeTab}
            onTabChange={(_e, data) => {
                setActiveTab(data.activeIndex as number)
                handleSetQuery(data.activeIndex as number)
            }}
        />
    );
}