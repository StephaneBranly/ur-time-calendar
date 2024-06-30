/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     SettingsSemester.tsx                               ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/13 10:49:22 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './SettingsSemester.scss'

import { DaySemesterOrganization, SemesterPlanning } from 'utils'

export interface SettingsSemesterProps {
    semesterPlanning: SemesterPlanning
}

const SettingsSemester = (props: SettingsSemesterProps) => {
    const { semesterPlanning } = props

    const days = semesterPlanning.referencedDays.sort((a, b) => {
        return a.date.getTime() - b.date.getTime() < 0 ? -1 : 1
    })

    const finauxDays = days.filter((day) => day.isFinal)
    const mediansDays = days.filter((day) => day.isMedian)

    const holidays = days.filter((day) => day.isHoliday)

    const feriesDays = days.filter((day) => day.isFerie)

    const becomesA = days.filter((day) => day.becomesA)

    const toRender = [
        ...finauxDays,
        ...mediansDays,
        ...holidays,
        ...feriesDays,
        ...becomesA,
    ].sort((a, b) => {
        return a.date.getTime() - b.date.getTime() < 0 ? -1 : 1
    })

    const renderDays = () => {
        const labelsStack = toRender.map((day) => [
            `${day.date.getDate()}/${
                day.date.getMonth() + 1
            }/${day.date.getFullYear()}`,
            ...renderDayLabel(day),
        ])

        let currentId = 0
        return labelsStack.map((day, index) => {
            if (day[2] !== currentId) {
                currentId = day[2] as number
                if (
                    index !== labelsStack.length - 1 &&
                    labelsStack[index + 1][2] === currentId
                )
                    return (
                        <div className="settings-semester_day" key={index}>
                            Du{' '}
                            <span className="settings-semester_day-date">
                                {day[0]}
                            </span>
                            {day[1]}
                        </div>
                    )
                else
                    return (
                        <div className="settings-semester_day" key={index}>
                            Le{' '}
                            <span className="settings-semester_day-date">
                                {day[0]}
                            </span>
                            {day[1]}
                        </div>
                    )
            } else {
                if (
                    index === labelsStack.length - 1 ||
                    labelsStack[index + 1][2] !== currentId
                )
                    return (
                        <div className="settings-semester_day" key={index}>
                            au{' '}
                            <span className="settings-semester_day-date">
                                {day[0]}
                            </span>
                        </div>
                    )
                else return undefined
            }
        })
    }

    const renderDayLabel = (day: DaySemesterOrganization) => {
        if (day.becomesA)
            return [
                <span className="settings-semester_day-label becomesA">
                    Devient un {day.becomesA.toLowerCase()}
                </span>,
                1,
            ]
        if (day.isFinal)
            return [
                <span className="settings-semester_day-label finaux">
                    Finaux
                </span>,
                2,
            ]
        if (day.isMedian)
            return [
                <span className="settings-semester_day-label medians">
                    Médians
                </span>,
                3,
            ]
        if (day.isHoliday)
            return [
                <span className="settings-semester_day-label vacances">
                    Vacances
                </span>,
                4,
            ]
        if (day.isFerie)
            return [
                <span className="settings-semester_day-label feries">
                    Férié
                </span>,
                5,
            ]
        return [<></>, 0]
    }

    return (
        <>
            <section className="settings-section">
                Contribuez au projet pour mettre à jour les calendriers des
                semestres à venir ;) Cela est rapide !
            </section>
            <section className="settings-section">
                <h2 className="settings-subtitle">
                    Semestre {semesterPlanning.semesterName}
                </h2>
                <div className="settings-week-alternance">
                    <div className="settings-week-alternance-a">Semaine A</div>
                    <div className="settings-week-alternance-b">Semaine B</div>
                </div>
                <div className="settings-semester">{renderDays()}</div>
            </section>
        </>
    )
}

export default SettingsSemester
