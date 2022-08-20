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
/*     Update: 2022/08/20 11:21:26 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import {
    Class,
    daysIndex,
    getDayLabel,
    getMonday,
    moveDate,
    SemesterPlanning,
} from 'utils'

import './Calendar.scss'
import { Fragment, useState } from 'react'
import { ClassSlot } from 'components'
import { BsCaretLeft, BsCaretRight } from 'react-icons/bs'

export interface CalendarProps {
    classes: Class[]
    semesterPlanning: SemesterPlanning
}

const Calendar = (props: CalendarProps) => {
    const { classes, semesterPlanning } = props

    const [view, setView] = useState<string>('day')
    const [selectedClass, setSelectedClass] = useState<Class | undefined>(
        undefined
    )
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const getDaysDatesToRender = () => {
        var days: Date[] = []
        const mof = getMonday(selectedDate)
        switch (view) {
            case 'compact':
                days = [
                    mof,
                    moveDate(mof, 1),
                    moveDate(mof, 2),
                    moveDate(mof, 3),
                    moveDate(mof, 4),
                ]
                break
            case 'complete':
                days = [
                    mof,
                    moveDate(mof, 1),
                    moveDate(mof, 2),
                    moveDate(mof, 3),
                    moveDate(mof, 4),
                    moveDate(mof, 5),
                    moveDate(mof, 6),
                ]
                break
            default:
                days = [selectedDate]
        }
        return days
    }
    const renderDays = () => {
        return getDaysDatesToRender().map((day, index) => {
            const extraLabel = semesterPlanning.isExam(day)
                ? 'Examens'
                : semesterPlanning.isFerie(day)
                ? 'Férié '
                : semesterPlanning.isHoliday(day)
                ? 'Vacances '
                : ''
            const rowStartIndex = timeToRowIndex(7, 0)
            const rowEndIndex = timeToRowIndex(20, 0)
            const replaceDay = semesterPlanning.becomesA(day)
            return (
                <Fragment key={index}>
                    <div
                        className={`calendar-legend-day col-start-${
                            index * 2 + 2
                        } col-end-${index * 2 + 4} ${
                            semesterPlanning.getWeekAlternance(day) === 'A'
                                ? 'week-a'
                                : 'week-b'
                        }`}
                    >
                        {getDayLabel(day)} {day.getDate()}{' '}
                        {replaceDay && ` (${replaceDay})`}
                    </div>
                    {extraLabel && (
                        <div
                            className={`calendar-special-day ${extraLabel} col-start-${
                                index * 2 + 2
                            } col-end-${
                                index * 2 + 4
                            } row-start-${rowStartIndex} row-end-${rowEndIndex}`}
                        >
                            {extraLabel}
                        </div>
                    )}
                </Fragment>
            )
        })
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

    const renderClasses = () => {
        const isADayView = view === 'day'
        return getDaysDatesToRender().map((day) => {
            if (
                semesterPlanning.isExam(day) ||
                semesterPlanning.isFerie(day) ||
                semesterPlanning.isHoliday(day)
            )
                return null
            const filtered = classes.filter(
                (c) =>
                    ((!semesterPlanning.becomesA(day) &&
                        c.day === getDayLabel(day).toUpperCase()) ||
                        semesterPlanning.becomesA(day)?.toUpperCase() ===
                            c.day) &&
                    (c.week === undefined ||
                        c.week === semesterPlanning.getWeekAlternance(day))
            )
            return filtered.map((unit: Class, index) => {
                const dayLabel = getDayLabel(day).toUpperCase()
                var colStartIndex = isADayView ? 2 : daysIndex[dayLabel] * 2 + 2
                var colEndIndex = isADayView ? 4 : daysIndex[dayLabel] * 2 + 4

                // switch (unit.week) {
                //     case 'A':
                //         colEndIndex = colStartIndex + 1
                //         break
                //     case 'B':
                //         colStartIndex = colEndIndex - 1
                //         break
                // }

                const rowStartIndex = timeToRowIndex(
                    unit.startHour,
                    unit.startMin
                )
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
                        setSelected={() =>
                            setSelectedClass(
                                selectedClass === unit ? undefined : unit
                            )
                        }
                    />
                )
            })
        })
    }

    const handlerMoveDate = (index: -1 | 1) => {
        const week = view === 'compact' || view === 'complete'
        setSelectedDate(moveDate(selectedDate, index, week))
    }
    const displaySelectedDate = () => {
        const week = view === 'compact' || view === 'complete'
        const stringMonthName = selectedDate.toLocaleDateString('fr-FR', {
            month: 'long',
        })
        if (week) {
            const mondayOfWeek = getMonday(selectedDate)

            return `Semaine du ${mondayOfWeek.getDate()} ${stringMonthName}`
        }
        const stringDayName = getDayLabel(selectedDate)
        return `${stringDayName} ${selectedDate.getDate()} ${stringMonthName}`
    }


    // Mobile swipes management
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        setTouchStart(e.targetTouches[0].clientX)
    }

    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 150)
            handlerMoveDate(1)
        if (touchStart - touchEnd < -150) 
            handlerMoveDate(-1)
    }

    return (
        <div className="calendar-fragment"
            onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent =>  handleTouchMove(touchMoveEvent)}
            onTouchEnd={() => handleTouchEnd()}
            >
            <div className="calendar-header">
                <div className="calendar-current-date">
                    <div
                        className="calendar-current-date-before"
                        onClick={() => handlerMoveDate(-1)}
                    >
                        <BsCaretLeft />
                    </div>
                    <div className="calendar-current-date-label">
                        {displaySelectedDate()}
                    </div>
                    <div
                        className="calendar-current-date-after"
                        onClick={() => handlerMoveDate(1)}
                    >
                        <BsCaretRight />
                    </div>
                </div>
                <div className="calendar-mode">
                    <div
                        className={`calendar-mode-selector ${
                            view === 'day' ? 'active' : ''
                        }`}
                        onClick={() => setView('day')}
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
            </div>
            <div className="calendar-content-fragment">
                <div className={`calendar-content ${view}`}>
                    <div
                        className="calendar-background-fragment"
                        onClick={() => setSelectedClass(undefined)}
                    ></div>
                    {renderDays()}
                    {renderSlots()}
                    {renderClasses()}
                </div>
            </div>
        </div>
    )
}

export default Calendar
