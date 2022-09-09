/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     toICS.ts                                           ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/09/09 18:52:15 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Class, SemesterPlanning } from "utils"
import { v4 as uuidv4 } from 'uuid'

const toICSDate = (date: Date) => {
    return date.getFullYear().toString() +
    ((date.getMonth() + 1)<10? "0" + (date.getMonth() + 1).toString():(date.getMonth() + 1).toString()) + 
    ((date.getDate() + 1)<10? "0" + date.getDate().toString():date.getDate().toString());
}

const writeDayEvent = (date: Date, name: string, tags='') => {
    return `BEGIN:VEVENT\nUID:${uuidv4()}@urtimecalendar.com\nDTSTAMP:19970901T130000Z\nDTSTART;VALUE=DATE:${toICSDate(date)}\nDTEND;VALUE=DATE:${toICSDate(new Date(date.getDate() + 1))}\nSUMMARY:${name}\nCATEGORIES:UTC${tags?','+tags:''}\nEND:VEVENT\n`
}

const toICS = (semesterOrganisation: SemesterPlanning, classes: Class[]) => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//urtimecalendar.com//NONSGML UrTimeCalendar//EN\n`
    
    for (const day = semesterOrganisation.starts; day <= semesterOrganisation.ends; day.setDate(day.getDate() + 1)) 
    {
        const replaceDay = semesterOrganisation.becomesA(day)
        const examDay = semesterOrganisation.isExam(day)
        const isFerie = semesterOrganisation.isFerie(day)
        const isHoliday = semesterOrganisation.isHoliday(day)
        if (replaceDay) {
            icsContent += writeDayEvent(day, `Devient un ${replaceDay.toLowerCase()}`, 'Remplacement')
        }
        if (examDay) {
            icsContent += writeDayEvent(day, `Jour d'examen`, 'Examen')
        }
        if (isFerie) {
            icsContent += writeDayEvent(day, `Ferié`)
        }
        if (isHoliday) {
            icsContent += writeDayEvent(day, `Vacances universitaires`, 'Vacances')
        }
    }
    icsContent += 'END:VCALENDAR'
    return 's' //icsContent
}

export default toICS