import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../app/store/store";
import { useEffect, useRef, useState } from "react";
import { actions } from "../eventSlice";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { QueryOptions } from "../../../app/hooks/firestore/types";
import EventFilters from "./EventFilters";
import EventListItemPlaceholder from "./EventListItemPlaceHolder";

type State = {
    filter: string;
    startDate: Date;
    query: QueryOptions[];
};

export default function EventDashBoard() {
    const contextRef = useRef(null)
    const { data: events, status } = useAppSelector(state => state.events);
    const { loadCollection } = useFireStore('events');

    const [state, setState] = useState<State>({
        filter: 'all',
        startDate: new Date(),
        query: [
            { attribute: 'date', operator: '>=', value: new Date() }
        ]
    });

    async function applyFilter(filter: string, query: QueryOptions[], date: Date) {
        setState({
            filter: filter,
            query: query,
            startDate: date
        });
    }

    async function changeDate(date: Date) {
        setState(prevState => ({
            ...prevState,
            startDate: date,
            query: prevState.query.map(q => q.attribute === 'date' ? { ...q, value: date } : q)
        }));
    }

    useEffect(() => {
        console.log('event dashboard: loading collection', state.query);
        loadCollection(actions, {
            queries: state.query
        });
    }, [loadCollection, state.query]);

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={10} ref={contextRef}>
                    {status === 'loading' ? (
                        <>
                            <EventListItemPlaceholder />
                            <EventListItemPlaceholder />
                        </>
                    ) : <EventList events={events} />
                    }

                </Grid.Column>
                <Grid.Column width={6}>
                    <div className = "ui fixed top sticky" style ={{top: 98, width: 405}}>
                        <EventFilters
                            startDate={state.startDate}
                            setStartDate={changeDate}
                            filter={state.filter}
                            setFilter={applyFilter} />
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
