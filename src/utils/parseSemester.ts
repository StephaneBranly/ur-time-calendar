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
/*     Update: 2022/08/11 14:05:53 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { DaySemesterOrganization, SemesterPlanning } from "utils"

const parseSemester = (organisation: string, semesterName: string) => {
    const semester = new SemesterPlanning(semesterName)
    const lines = organisation.split('\n')
    lines.forEach((line) => {
        console.log('here')
        const match = line.match(
            /([0-9]{4})\/([0-9]{2})\/([0-9]{2})-([0-9]{4})\/([0-9]{2})\/([0-9]{2})-([A|B])-([E|F|H|x])-(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|x)/
        )
        if (match?.length) {
            console.log('match')
            const [_, startYear, startMonth, startDay, endYear, endMonth, endDay, weekAlternance, type, becomesA] = match
            for (let i = parseInt(startYear); i <= parseInt(endYear); i++) {
                for (let j = parseInt(startMonth); j <= parseInt(endMonth); j++) {
                    for (let k = parseInt(startDay); k <= parseInt(endDay); k++) {
                        const date = new Date(i, j - 1, k)
                        const options: Record<string, any> = { 'weekAlternance': weekAlternance }
                        switch (type) {
                            case 'E':
                                options['isExam'] = true;
                                break;
                            case 'F':
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
        }
    })

    return semester
}

export default parseSemester