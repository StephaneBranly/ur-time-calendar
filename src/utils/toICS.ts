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
/*     Update: 2022/09/09 20:01:24 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Class, getDayLabel, SemesterPlanning } from "utils"
import { v4 as uuidv4 } from 'uuid'

const toICSDateTime = (date: Date, hour: number, min: number) => {
    return `${toICSDate(date)}T${hour < 10 ? `0${hour}` : hour}${min < 10 ? `0${min}` : min}00`
}

const toICSDate = (date: Date) => {
    // const year = date.getFullYear()
    // const month = date.getMonth() + 1
    // const day = date.getDate()
    return date.getFullYear().toString() +
    ((date.getMonth() + 1)<10? "0" + (date.getMonth() + 1).toString():(date.getMonth() + 1).toString()) + 
    (date.getDate()<10? "0" + date.getDate().toString():date.getDate().toString());
}

const writeDayEvent = (date: Date, name: string, tags='') => {
    const tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return `BEGIN:VEVENT\nUID:${uuidv4()}@urtimecalendar.com\nDTSTAMP:19970901T130000Z\nDTSTART;VALUE=DATE:${toICSDate(date)}\nDTEND;VALUE=DATE:${toICSDate(tomorrow)}\nSUMMARY:${name}\nCATEGORIES:UTC${tags?','+tags:''}\nEND:VEVENT\n`
}

const writeClassEvent = (classSlot: Class, date: Date) => {
    return `BEGIN:VEVENT\nSUMMARY:${classSlot.UVname} - ${classSlot.prettyClassType} ${classSlot.classReference}\nUID:${uuidv4()}@urtimecalendar.com\nTRANSP:TRANSPARENT\nDTSTART:${toICSDateTime(date, classSlot.startHour, classSlot.startMin)}\nDTEND:${toICSDateTime(date, classSlot.endHour, classSlot.endMin)}\nDTSTAMP:19970901T130000Z\nLOCATION:${classSlot.place}\nCATEGORIES:UTC,${classSlot.UVname},${classSlot.prettyClassType}${classSlot.classReference}\nEND:VEVENT\n`
}

const toICS = (semesterPlanning: SemesterPlanning, classes: Class[]) => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//urtimecalendar.com//NONSGML UrTimeCalendar//EN\n`
    
    for (const day = semesterPlanning.starts; day <= semesterPlanning.ends; day.setDate(day.getDate() + 1)) 
    {
        const replaceDay = semesterPlanning.becomesA(day)
        const examDay = semesterPlanning.isExam(day)
        const isFerie = semesterPlanning.isFerie(day)
        const isHoliday = semesterPlanning.isHoliday(day)
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

        if (!isFerie && !isHoliday && !examDay) {
            const filtered = classes.filter(
                (c) =>
                    ((!semesterPlanning.becomesA(day) &&
                        c.day === getDayLabel(day).toUpperCase()) ||
                        semesterPlanning.becomesA(day)?.toUpperCase() ===
                            c.day) &&
                    (c.week === undefined ||
                        c.week === semesterPlanning.getWeekAlternance(day))
            )

              // eslint-disable-next-line no-loop-func
            filtered.forEach((c) => {
                icsContent += writeClassEvent(c, day)
            })
        }
      
    }
    icsContent += 'END:VCALENDAR'
    return icsContent
}

export default toICS