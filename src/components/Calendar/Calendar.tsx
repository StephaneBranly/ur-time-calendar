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
/*     Update: 2022/03/02 13:22:03 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Class, daysIndex } from 'utils'

import './Calendar.scss'
import { useState } from 'react'
import { ClassSlot } from 'components'

export interface CalendarProps {
    classes: Class[]
}

const Calendar = (props: CalendarProps) => {
    const { classes } = props

    const getCurrentDay = () => {
        var stringDateName = new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
        })
        return stringDateName[0].toUpperCase() + stringDateName.slice(1)
    }

    const [view, setView] = useState<string>(getCurrentDay())
    const [selectedClass, setSelectedClass] = useState<Class | undefined>(
        undefined
    )

    const renderDays = () => {
        var days: string[] = []
        switch (view) {
            case 'compact':
                days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
                break
            case 'complete':
                days = [
                    'Lundi',
                    'Mardi',
                    'Mercredi',
                    'Jeudi',
                    'Vendredi',
                    'Samedi',
                    'Dimanche',
                ]
                break
            default:
                days = [view]
        }
        return days.map((day, index) => (
            <div
                key={index}
                className={`calendar-legend-day col-start-${
                    index * 2 + 2
                } col-end-${index * 2 + 4}`}
            >
                {day}
            </div>
        ))
    }

    const renderSlot = (hour: number, min: number) => {
        const rowStartIndex = timeToRowIndex(hour, min)
        const rowEndIndex = min === 0 ? rowStartIndex + 5 : rowStartIndex + 2
        const position = `row-start-${rowStartIndex} row-end-${rowEndIndex}`

        const importance = [
            '8:0',
            '10:0',
            '10:15',
            '12:15',
            '14:15',
            '16:15',
            '16:30',
            '18:30',
        ].includes(`${hour}:${min}`)
            ? 'important'
            : ''
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
                    className={`slot ${importance} ${position} ${
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

    const isViewADayView = () => {
        return !['compact', 'complete'].includes(view)
    }

    const renderClasses = () => {
        return classes.map((unit: Class, index) => {
            if (isViewADayView() && unit.day !== view.toUpperCase()) return null
            var colStartIndex = isViewADayView()
                ? 2
                : daysIndex[unit.day] * 2 + 2
            var colEndIndex = isViewADayView() ? 4 : daysIndex[unit.day] * 2 + 4

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
                <ClassSlot
                    key={index}
                    unit={unit}
                    colStartIndex={colStartIndex}
                    colEndIndex={colEndIndex}
                    rowStartIndex={rowStartIndex}
                    rowEndIndex={rowEndIndex}
                    selected={selectedClass === unit}
                    setSelected={() => setSelectedClass(unit)}
                />
            )
        })
    }
    return (
        <div className="calendar-fragment">
            <div className="calendar-header">
                <div
                    className={`calendar-mode-selector ${
                        isViewADayView() ? 'active' : ''
                    }`}
                    onClick={() => setView(getCurrentDay())}
                >
                    Au jour
                </div>
                <div
                    className={`calendar-mode-selector ${
                        view === 'compact' ? 'active' : ''
                    }`}
                    onClick={() => setView('compact')}
                >
                    Semaine compacte
                </div>
                <div
                    className={`calendar-mode-selector ${
                        view === 'complete' ? 'active' : ''
                    }`}
                    onClick={() => setView('complete')}
                >
                    Semaine complète
                </div>
            </div>
            <div className="calendar-content-fragment">
                <div
                    className={`calendar-content ${
                        isViewADayView() ? 'day' : view
                    }`}
                >
                    {renderDays()}
                    {renderSlots()}
                    {renderClasses()}
                </div>
            </div>
        </div>
    )
}

export default Calendar
