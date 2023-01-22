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
/*     Update: 2022/12/26 16:23:26 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import {
    Class,
    daysIndex,
    Exam,
    getDayLabel,
    getMonday,
    isKifyAccepted,
    moveDate,
    SemesterPlanning,
} from 'utils'

import './Calendar.scss'
import { Fragment, useState } from 'react'
import { ClassSlot, ExamSlot } from 'components'
import { BsCaretLeft, BsCaretRight } from 'react-icons/bs'

export interface CalendarProps {
    classes: Class[]
    exams: Exam[]
    semesterPlanning: SemesterPlanning
}

const Calendar = (props: CalendarProps) => {
    const { classes, semesterPlanning, exams } = props

    const [view, setView] = useState<string>(isKifyAccepted() ? localStorage.getItem('view') ?? 'day' : 'day')
    const [selectedSlot, setSelectedSlot] = useState<Class | Exam | undefined>(
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
            case 'typical':
                days = [
                    mof,
                    moveDate(mof, 1),
                    moveDate(mof, 2),
                    moveDate(mof, 3),
                    moveDate(mof, 4),
                ]
                break
            default:
                days = [selectedDate]
        }
        return days
    }

    const handlerSetView = (view: string) => {
        setView(view)
        if (isKifyAccepted()) {
            localStorage.setItem('view', view)
        }
    }

    const renderDays = () => {
        return getDaysDatesToRender().map((day, index) => {
            const isTypicalView = view === 'typical'
            const extraLabel = semesterPlanning.isMedian(day)
                ? 'Médians'
                : semesterPlanning.isFinal(day)
                ? 'Finaux'
                : semesterPlanning.isFerie(day)
                ? 'Férié '
                : semesterPlanning.isHoliday(day)
                ? 'Vacances '
                : ''
            const rowStartIndex = timeToRowIndex(7, 0)
            const rowEndIndex = timeToRowIndex(20, 0)
            const replaceDay = isTypicalView ? undefined : semesterPlanning.becomesA(day)
            return (
                <Fragment key={index}>
                    <div
                        className={`calendar-legend-day col-start-${
                            index * 2 + 2
                        } col-end-${index * 2 + 4} ${
                            isTypicalView || 
                            (extraLabel!== '' && !semesterPlanning.isMedian(day)) || 
                            day.getDay() === 0 ? '' : semesterPlanning.getWeekAlternance(day) === 'A'
                                ? 'week-a'
                                : 'week-b'
                        }`}
                    >
                        {getDayLabel(day)} {!isTypicalView && day.getDate()}{' '}
                        {replaceDay && ` (${replaceDay})`}
                    </div>
                    {extraLabel && !isTypicalView && (
                        <div
                            className={`calendar-special-day ${extraLabel} col-start-${
                                index * 2 + 2
                            } col-end-${
                                index * 2 + 4
                            } row-start-${rowStartIndex} row-end-${rowEndIndex}`}
                            onClick={() => setSelectedSlot(undefined)}
                        >
                            {extraLabel}
                        </div>
                    )}
                </Fragment>
            )
        })
    }

    const renderExams= () => {
        const isADayView = view === 'day'
        return getDaysDatesToRender().map((day) => {
            const filtered = exams.filter(
                (e) =>
                    e.start.getDate() === day.getDate() && e.start.getMonth() === day.getMonth() && e.start.getFullYear() === day.getFullYear()
            )
            return filtered.map((exam, index) => {
                const dayIndex = daysIndex[exam.start.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                }).toUpperCase()]

                const rowStartIndex = timeToRowIndex(exam.start.getHours(), exam.start.getMinutes())
                const rowEndIndex = timeToRowIndex(exam.end.getHours(), exam.end.getMinutes())
                var colStartIndex = isADayView ? 2 : dayIndex * 2 + 2
                var colEndIndex = isADayView ? 4 : dayIndex * 2 + 4
                
                
                return (
                    <ExamSlot unit={exam} key={index}
                    colStartIndex={colStartIndex}
                    colEndIndex={colEndIndex}
                    rowStartIndex={rowStartIndex}
                    rowEndIndex={rowEndIndex}
                    selected={selectedSlot === exam}
                    setSelected={() =>
                        setSelectedSlot(
                            selectedSlot === exam ? undefined : exam
                        )
                    }
                    />
                )
            })
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
        const isTypicalView = view === 'typical'

        return getDaysDatesToRender().map((day) => {
            if (
                (semesterPlanning.isExam(day) ||
                semesterPlanning.isFerie(day) ||
                semesterPlanning.isHoliday(day)) &&
                !isTypicalView
            )
                return null
            const filtered = classes.filter(
                (c) =>
                    ((!semesterPlanning.becomesA(day) &&
                        c.day === getDayLabel(day).toUpperCase()) ||
                        semesterPlanning.becomesA(day)?.toUpperCase() ===
                            c.day || (isTypicalView && c.day === getDayLabel(day).toUpperCase())) &&
                    (c.week === undefined ||
                        c.week === semesterPlanning.getWeekAlternance(day) || isTypicalView)
            )
            return filtered.map((unit: Class, index) => {
                const dayLabel = getDayLabel(day).toUpperCase()
                var colStartIndex = isADayView ? 2 : daysIndex[dayLabel] * 2 + 2
                var colEndIndex = isADayView ? 4 : daysIndex[dayLabel] * 2 + 4

                if (isTypicalView) {
                    switch (unit.week) {
                        case 'A':
                            colEndIndex = colStartIndex + 1
                            break
                        case 'B':
                            colStartIndex = colEndIndex - 1
                            break
                    }
                }

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
                        selected={selectedSlot === unit}
                        setSelected={() =>
                            setSelectedSlot(
                                selectedSlot === unit ? undefined : unit
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
        setTouchEnd(e.targetTouches[0].clientX)
    }

    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    function handleTouchEnd() {
        if (touchStart - touchEnd > 100)
            handlerMoveDate(1)
        if (touchStart - touchEnd < -100) 
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
                    {view !== 'typical' && (<>
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
                    </div></>)}
                </div>
                <div className="calendar-mode">
                    <select className="calendar-mode-selector" onChange={(e) => handlerSetView(e.target.value)} defaultValue={view}>
                        <option value="day">Au jour</option>
                        <option value="compact">Semaine compacte</option>
                        <option value="complete">Semaine complète</option>
                        <option value="typical">Semaine type</option>
                    </select>
                </div>
            </div>
            <div className="calendar-content-fragment">
                <div className={`calendar-content ${view}`}>
                    <div
                        className="calendar-background-fragment"
                        onClick={() => setSelectedSlot(undefined)}
                    ></div>
                    {renderDays()}
                    {renderSlots()}
                    {renderClasses()}
                    {view !== 'typical' && renderExams()}
                </div>
            </div>
        </div>
    )
}

export default Calendar
