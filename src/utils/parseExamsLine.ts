/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     parseExamsLine.ts                                  ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/13 18:05:47 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Exam } from 'utils'

const parseExamsLine = (line: string, type: 'médian' | 'final'): Exam | undefined => {
    const match = line.match(
        /([A-Z0-9]{4})\s*([0-9]{2})\/([0-9]{2})\/([0-9]{4})\s*de\s*([0-9]{2}:[0-9]{2})\s*à\s*([0-9]{2}:[0-9]{2})\s([A-Za-z\s]*[A-Za-z])\s*(place\s*[0-9]*)/
    )
    if (match?.length) {
        const UVname = match[1]
        const day = Number(match[2])
        const month = Number(match[3]) - 1
        const year = Number(match[4])
        const startTime = match[5]
        const endTime = match[6]
        const place = match[7]
        const seat = match[8]

        const startDate = new Date(year, month, day)
        startDate.setHours(parseInt(startTime.split(':')[0]))
        startDate.setMinutes(parseInt(startTime.split(':')[1]))

        const endDate = new Date(year, month, day)
        endDate.setHours(parseInt(endTime.split(':')[0]))
        endDate.setMinutes(parseInt(endTime.split(':')[1]))

        const exam = new Exam({
            UVname,
            start: startDate,
            end: endDate,
            place,
            seat,
            type
        })
        return exam
    }
    return undefined
}

export default parseExamsLine
