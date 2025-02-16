/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     parseSemester.ts                                   ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/11 00:34:08 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { DaySemesterOrganization, SemesterPlanning } from "utils"

const parseSemester = (organisation: string, semesterName: string) => {
    const semester = new SemesterPlanning(semesterName)
    const lines = organisation.split('\n')
    lines.forEach((line) => {
        const match = line.match(
            /([0-9]{4})\/([0-9]{2})\/([0-9]{2})-([0-9]{4})\/([0-9]{2})\/([0-9]{2})-([A|B|x])-([E|C|H|F|M|x])-(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|x)/
        )
        if (match?.length) {
            const [_, startYear, startMonth, startDay, endYear, endMonth, endDay, weekAlternance, type, becomesA] = match
            for (let i = parseInt(startYear); i <= parseInt(endYear); i++) {
                for (let j = parseInt(startMonth); j <= parseInt(endMonth); j++) {
                    for (let k = parseInt(startDay); k <= parseInt(endDay); k++) {
                        const date = new Date(i, j - 1, k)
                        const options: Record<string, any> = { 'weekAlternance': weekAlternance }
                        switch (type) {
                            case 'F':
                                options['isFinal'] = true;
                                break;
                            case 'M':
                                options['isMedian'] = true;
                                break;
                            case 'C':
                                options['isFerie'] = true;
                                break;
                            case 'H':
                                options['isHoliday'] = true;
                                break;
                            default:
                                break;
                        }
                        if (becomesA !== 'x')
                            options['becomesA'] = becomesA
                        const organisationDay = new DaySemesterOrganization(date, options)
                        semester.registerDay(organisationDay)                 
                    }
                }
            }
        } else {
            const match = line.match(
                /(starts|ends):([0-9]{4})\/([0-9]{2})\/([0-9]{2})/
            )
            if (match?.length) {
                const [_, type, year, month, day] = match
                const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
                if (type === 'starts')
                    semester.setStartDate(date)
                else
                    semester.setEndDate(date)
            }
        }
    })

    return semester
}

export default parseSemester
