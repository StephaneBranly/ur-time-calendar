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
/*     Update: 2022/12/13 11:38:57 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Exam } from 'utils'

const parseExamsLine = (line: string, type: 'median' | 'final'): Exam | undefined => {
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
        const seet = match[8]

        const startDate = new Date(year, month, day, parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]))

        const endDate = new Date(year, month, day, parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]))

        const exam = new Exam({
            UVname,
            start: startDate,
            end: endDate,
            place,
            seet,
            type
        })
        return exam
    }
    return undefined
}

export default parseExamsLine
