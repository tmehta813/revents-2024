import { Header, Menu } from "semantic-ui-react";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";
import { QueryOptions } from "../../../app/hooks/firestore/types";
import { useAppSelector } from "../../../app/store/store";


type Props = {
    filter: string;
    setFilter: (filter: string, query: QueryOptions[], startDate: Date) => void;
    startDate: Date;
    setStartDate: (date: Date) => void;
};

export default function EventFilters({ filter, setFilter, startDate, setStartDate }: Props) {
    const { currentUser } = useAppSelector(state => state.auth);
    const { status } = useAppSelector(state => state.events);

    function handleSetFilter(date: Date, fil: string) {
        if (!currentUser?.uid) return;
        let q: QueryOptions[];
        if (fil === 'isGoing') {
            q = [
                { attribute: 'attendeeIds', operator: 'array-contains', value: currentUser.uid },
                { attribute: 'date', operator: '>=', value: date },  // Correct date attribute
            ];
        } else if (fil === 'isHost') {
            q = [
                { attribute: 'hostUid', operator: '==', value: currentUser.uid },
                { attribute: 'date', operator: '>=', value: date },  // Correct date attribute
            ];
        } else {
            q = [
                { attribute: 'date', operator: '>=', value: date },  // Correct date attribute
            ];
        }

        setFilter(fil, q, date);
    }

    const handleDateChange = (date: Date) => {
        setStartDate(date);
        handleSetFilter(date, filter);
    };

    return (
        <Menu vertical size='large' style={{ width: '100%' }}>
            <Header attached color='teal' content='Filters' />
            <Menu.Item
                disabled={status === 'loading'}
                active={filter === 'all'}
                onClick={() => handleSetFilter(startDate, 'all')}
                content='All events'
            />
            <Menu.Item
                content="I'm Going"
                disabled={status === 'loading'}
                active={filter === 'isGoing'}
                onClick={() => handleSetFilter(startDate, 'isGoing')}
            />
            <Menu.Item
                content="I'm Hosting"
                disabled={status === 'loading'}
                active={filter === 'isHost'}
                onClick={() => handleSetFilter(startDate, 'isHost')}
            />
            <Header icon='calendar' attached color='teal' content='Select date' />
            <Calendar
                value={startDate}
                onChange={date => handleDateChange(date as Date)}
            />
        </Menu>
    );
}
