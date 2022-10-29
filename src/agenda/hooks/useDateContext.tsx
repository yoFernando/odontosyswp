import { useState, createContext } from "react";
import { formatZero } from './../../common/helper';
import { IChildren } from './../../common/types';

const getDefaultDates = () => {
    const dates: string[] = [];
    const now = new Date();
    for (let i = 0; i < 5; i++) {
        const copyDate = new Date(now.valueOf());
        copyDate.setDate(copyDate.getDate() + i);
        dates.push(`${copyDate.getFullYear()}-${formatZero(+copyDate.getMonth() + 1)}-${formatZero(copyDate.getDate())}`)
    }
    return dates;
}

interface IDates {
    date: string,
    dates: string[],
    onChangeDate: (d: string) => void,
    onRefreshDate: () => void
}

export const DateContext = createContext<IDates>({} as IDates);

function DatesContainer(props: IChildren) {
    const [dates, setDefaultDates] = useState(getDefaultDates)
    const [date, setDate] = useState(dates[0]);

    const onChangeDate = (newDate: string) => {
        setDate(newDate);
    }

    const onRefreshDate = () => {
        setDefaultDates(getDefaultDates());
    }

    return (
        <DateContext.Provider value={{ date, dates, onChangeDate, onRefreshDate }}>
            {props.children}
        </DateContext.Provider>
    )
};

export default DatesContainer