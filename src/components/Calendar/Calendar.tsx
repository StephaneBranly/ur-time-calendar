import { Class, daysIndex } from 'utils'
import './Calendar.scss'

export interface CalendarProps {
    view: string
    defaultActiveDay?: string
    classes: Class[]
}

const Calendar = (props: CalendarProps) => {
    const { view, defaultActiveDay, classes } = props

    const renderDays = () => {
        switch (view) {
            case 'day':
                return defaultActiveDay ? <>Today</> : <></>
            case 'compact':
                return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, index) => <div key={index} className={`day col-start-${index * 2 + 1} col-end-${index * 2 + 3}`}>{day}</div>)
            case 'complete':
                return <></>
        }
    }

    const timeToRowIndex = (hour: number, min: number) => {
        return (hour - 7 + 2) * 4 + min / 15
    }

    const renderClasses = () => {
        return classes.map((unit: Class, index) => {
            var colStartIndex = daysIndex[unit.day] * 2 + 1
            var colEndIndex = daysIndex[unit.day] * 2 + 3

            switch(unit.week) {
                case 'A':
                    colEndIndex = colStartIndex + 1
                    break;
                case 'B':
                    colStartIndex = colEndIndex - 1
                    break;
            }

            const rowStartIndex = timeToRowIndex(unit.startHour, unit.startMin)
            const rowEndIndex = timeToRowIndex(unit.endHour, unit.endMin)
            return <div key={index} className={`class col-start-${colStartIndex} col-end-${colEndIndex} row-start-${rowStartIndex} row-end-${rowEndIndex}`}>{unit.UVname} - {unit.prettyClassType} {unit.classReference} - {unit.place}</div>
        })
    }
    return (
        <div className="calendar-fragment">
            {/* <div className='calendar-header'>
                <div className='calendar-mode-selector'>Au jour</div>
                <div className='calendar-mode-selector'>Semaine compacte</div>
                <div className='calendar-mode-selector'>Semaine complète</div>
            </div> */}
            <div className="calendar-content compact">
                {renderDays()}
                {renderClasses()}
            </div>
        </div>
    )
}

export default Calendar