import {Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { useCallback, useEffect, useState } from "react";
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
    const dispatch = useAppDispatch()
    const { data: events, status, loadedInitial } = useAppSelector(state => state.events);
    const { loadCollection, hasMore } = useFireStore('events');

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

    const loadEvents = useCallback((reset: boolean) => {
        loadCollection(actions, {
            queries: state.query,
            limit: 2,
            sort: { attribute: 'date', order: 'asc' },
            pagination: true,
            reset,
            get: true
        });
    }, [loadCollection, state.query])

    function loadMore() {
        loadEvents(false)
    }

    useEffect(() => {
        loadEvents(true)
        return () => {
            dispatch(actions.reset())
        }
    }, [loadEvents, dispatch])

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={10}>
                    {!loadedInitial ? (
                        <>
                            <EventListItemPlaceholder />
                            <EventListItemPlaceholder />
                        </>
                    ) :
                        <>
                            <EventList
                                events={events}
                                hasMore={hasMore.current}
                                loadMore={loadMore}
                                loading={status === 'loading'}
                            />
                           
                        </>
                    }

                </Grid.Column>
                <Grid.Column width={6}>
                    <div className="ui fixed top sticky" style={{ top: 98, width: 405, zIndex: 1 }}>
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
