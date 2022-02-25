/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     Calendar.tsx                                       ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/02/25 11:29:09 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

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
                return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map(
                    (day, index) => (
                        <div
                            key={index}
                            className={`day col-start-${
                                index * 2 + 2
                            } col-end-${index * 2 + 4}`}
                        >
                            {day}
                        </div>
                    )
                )
            case 'complete':
                return <></>
        }
    }

    const renderSlot = (hour: number, min: number) => {
        const rowStartIndex = timeToRowIndex(hour, min)
        const rowEndIndex = timeToRowIndex(hour, min)
        const position = `col-start-0 col-end-1 row-start-${rowStartIndex} row-end-${rowEndIndex}}`
        return (
            <>
                <div
                    className={`slot ${position}  ${
                        min === 0 ? 'solid' : 'dashed'
                    }`}
                ></div>
            </>
        )
    }
    const renderSlots = () => {
        const slots: JSX.Element[] = []
        for (var h = 7; h < 21; h++)
            [0, 15, 30, 45].forEach((m) => slots.push(renderSlot(h, m)))
        return slots
    }

    const timeToRowIndex = (hour: number, min: number, end = false) => {
        const index = (hour - 7) * 4 + min / 15 + 2
        return end ? index + 1 : index
    }

    const renderClasses = () => {
        return classes.map((unit: Class, index) => {
            var colStartIndex = daysIndex[unit.day] * 2 + 2
            var colEndIndex = daysIndex[unit.day] * 2 + 4

            switch (unit.week) {
                case 'A':
                    colEndIndex = colStartIndex + 1
                    break
                case 'B':
                    colStartIndex = colEndIndex - 1
                    break
            }

            const rowStartIndex = timeToRowIndex(unit.startHour, unit.startMin)
            const rowEndIndex = timeToRowIndex(unit.endHour, unit.endMin, true)
            return (
                <div
                    key={index}
                    className={`class col-start-${colStartIndex} col-end-${colEndIndex} row-start-${rowStartIndex} row-end-${rowEndIndex}`}
                >
                    {unit.UVname} - {unit.prettyClassType} {unit.classReference}{' '}
                    - {unit.place}
                </div>
            )
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
                {renderSlots()}
                {renderClasses()}
            </div>
        </div>
    )
}

export default Calendar
