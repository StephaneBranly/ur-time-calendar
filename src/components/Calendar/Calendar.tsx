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
/*     Update: 2022/02/25 21:38:37 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Class, daysIndex } from 'utils'
import { CgPin } from 'react-icons/cg'
import { RiBook2Line } from 'react-icons/ri'

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
        const rowEndIndex = min === 0 ? rowStartIndex + 5 : rowStartIndex + 2
        const position = `row-start-${rowStartIndex} row-end-${rowEndIndex}`
        return (
            <>
                {min === 0 && (
                    <div
                        className={`slot-time col-start-1 col-end-1 ${position}`}
                    >
                        {hour}:00
                    </div>
                )}
                <div
                    className={`slot ${position} ${
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

    const timeToRowIndex = (hour: number, min: number) => {
        return (hour - 7) * 4 + min / 15 + 2
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
            const rowEndIndex = timeToRowIndex(unit.endHour, unit.endMin)
            return (
                <div
                    key={index}
                    className={`class col-start-${colStartIndex} col-end-${colEndIndex} row-start-${rowStartIndex} row-end-${rowEndIndex}`}
                >
                    <span className="class-uvname">
                        <RiBook2Line />
                        {unit.UVname} - {unit.prettyClassType}{' '}
                        {unit.classReference}
                    </span>
                    <span className="class-place">
                        <CgPin />
                        {unit.place}
                    </span>
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
