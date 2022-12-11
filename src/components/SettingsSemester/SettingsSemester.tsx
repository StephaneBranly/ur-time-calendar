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
/*     Update: 2022/12/11 01:24:47 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './SettingsSemester.scss'

import { DaySemesterOrganization, SemesterPlanning } from "utils"

export interface SettingsSemesterProps {
    semesterPlanning: SemesterPlanning
}

const SettingsSemester = (props: SettingsSemesterProps) => {
    const { semesterPlanning } = props

    const days = semesterPlanning.referencedDays.sort((a, b) => { return (a.date.getTime() - b.date.getTime() < 0) ? -1 : 1})
    
    const finauxDays = days.filter(day => day.isFinal)
    const mediansDays = days.filter(day => day.isMedian)

    const holidays = days.filter(day => day.isHoliday)

    const feriesDays = days.filter(day => day.isFerie)

    const becomesA = days.filter(day => day.becomesA)

    const toRender = [...finauxDays, ...mediansDays, ...holidays, ...feriesDays, ...becomesA].sort((a, b) => { return (a.date.getTime() - b.date.getTime() < 0) ? -1 : 1})

    const renderDays = () => {
        const labelsStack = toRender.map(day => [day, ...renderDayLabel(day)])
        
        let currentId = 0
        return labelsStack.map((day, index) => {
            if (day[2] !== currentId) {
                currentId = day[2] as number
                if (index !== labelsStack.length-1 && labelsStack[index + 1][2] === currentId)
                    return (
                        <div className="settings-semester_day" key={(day[0] as DaySemesterOrganization).date.getTime()}>
                            Du <span className="settings-semester_day-date">{(day[0] as DaySemesterOrganization).date.toLocaleDateString()}</span>
                            {day[1]}
                        </div>
                    )
                else
                    return (
                        <div className="settings-semester_day" key={(day[0] as DaySemesterOrganization).date.getTime()}>
                            <span className="settings-semester_day-date">{(day[0] as DaySemesterOrganization).date.toLocaleDateString()}</span>
                            {day[1]}
                        </div>
                    )
            } else {
                if (index === labelsStack.length-1 || labelsStack[index + 1][2] !== currentId)
                    return (
                        <div className="settings-semester_day" key={(day[0] as DaySemesterOrganization).date.getTime()}>
                            au <span className="settings-semester_day-date">{(day[0] as DaySemesterOrganization).date.toLocaleDateString()}</span>
                        </div>
                    )
                else
                    return undefined
            }
        })
    }

    const renderDayLabel = (day: DaySemesterOrganization) => {
        if (day.becomesA)
            return [<span className="settings-semester_day-label becomesA">Devient un {day.becomesA.toLowerCase()}</span>,1]
        if (day.isFinal)
            return [<span className="settings-semester_day-label finaux">Finaux</span>,2]
        if (day.isMedian)
            return [<span className="settings-semester_day-label medians">Médians</span>,3]
        if (day.isHoliday)
            return [<span className="settings-semester_day-label vacances">Vacances</span>,4]
        if (day.isFerie)
            return [<span className="settings-semester_day-label feries">Fériés</span>,5]
        return [<></>, 0]
    }

    return (   <>
        <div className="settings-section">
            L'admin s'occupe de la gestion des semestres, vous n'avez pas (encore) besoin de les importer vous même!
        </div>
        <div className="settings-section">
            
            <div className="settings-semester">
            {renderDays()}
            </div>
        </div>
        </>
    )
}

export default SettingsSemester
