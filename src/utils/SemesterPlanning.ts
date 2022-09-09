/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     SemesterPlanning.ts                                ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/09/09 19:33:31 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import DaySemesterOrganization from './DaySemesterOrganization'

export default class SemesterPlanning {
    private _semesterName: string
    private _referencedDays: DaySemesterOrganization[]
    private _starts: Date
    private _ends: Date

    constructor(semesterName: string) {
        this._semesterName = semesterName
        this._referencedDays = []
        this._starts = new Date()
        this._ends = new Date()
    }

    registerDay = (newDay: DaySemesterOrganization) => {
        this._referencedDays.push(newDay)
    }

    setStartDate = (newStarts: Date) => {
        this._starts = new Date(newStarts)
    }
    setEndDate = (newEnds: Date) => {
        this._ends = new Date(newEnds)
    }
    
    getDaySemesterOrganizaton = (date: Date) => {
        const filteredResult = this._referencedDays.filter((f) => {
            const d = f.date
            return (
                d.getDate() === date.getDate() &&
                d.getMonth() === date.getMonth() &&
                d.getFullYear() === date.getFullYear()
            )
        })
        if (filteredResult.length === 0 || filteredResult.length > 1)
            return undefined
        return filteredResult[0]
    }

    getWeekAlternance = (date: Date) => {
        return this.getDaySemesterOrganizaton(date)?.weekAlternance
    }

    isHoliday = (date: Date) => {
        return this.getDaySemesterOrganizaton(date)?.isHoliday
    }

    isExam = (date: Date) => {
        return this.getDaySemesterOrganizaton(date)?.isExam
    }

    isFerie = (date: Date) => {
        return this.getDaySemesterOrganizaton(date)?.isFerie
    }

    becomesA = (date: Date) => {
        return this.getDaySemesterOrganizaton(date)?.becomesA
    }
    get semesterName() {
        return this._semesterName
    }
    get starts() {
        return new Date(this._starts)
    }
    get ends() {
        return new Date(this._ends)
    }
}
