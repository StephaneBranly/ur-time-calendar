/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     parseLine.ts                                       ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/12 23:32:38 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import allColors from 'data/allColors'
import { classColor } from 'types/classColor'
import { Class, parseDay } from 'utils'
// import math

const parseLine = (line: string, uvsColors: Record<string, classColor>): Class[] | undefined => {
    const match = line.match(
        /([A-Z0-9]{4})\s*(([A-Z]{1})\s([0-9]*)|([A-Z]{1})([0-9]*))\s([AB])?\s*([A-Z.]*)\s([0-9]{2}:[0-9]{2})-([0-9]{2}:[0-9]{2}),(F[0-9]),S=([A-Z0-9]*)(\s*\/([A-Z.]*)\s([0-9]{2}:[0-9]{2})-([0-9]{2}:[0-9]{2}),(F[0-9]),S=([A-Z0-9]*))?/
    )
    if (match?.length) {
        const UVname = match[1]
        const classType = match[3] ? match[3] : match[5]
        const classReference = match[4] ? match[4] : match[6]
        const week = match[7]
        const day = parseDay(match[8]) ?? ''
        const start = match[9]
        const end = match[10]
        const place = match[12]
        const frequence = match[11]
        const color = (UVname in uvsColors ? uvsColors[UVname] : allColors[Math.floor(Math.random() * allColors.length)]) as classColor
        // const color = allColors[Math.floor(Math.random() * allColors.length)] as classColor
        // const color ='reef'
        const classes = [new Class({
            UVname,
            classType,
            classReference: Number(classReference),
            day,
            start,
            end,
            place,
            frequence,
            week: week as 'A' | 'B' | undefined,
            color
        })]
        if(match[13]) {
            const day_2 = parseDay(match[14]) ?? ''
            const start_2 = match[15]
            const end_2 = match[16]
            const place_2 = match[18]
            const frequence_2 = match[17]
            const week_2 = match[19]
            classes.push(new Class({
                UVname,
                classType,
                classReference: Number(classReference),
                day: day_2,
                start: start_2,
                end: end_2,
                place: place_2,
                frequence: frequence_2,
                week: week_2 as 'A' | 'B' | undefined,
                color
            }))
        }
        return classes
    }
    return undefined
}

export default parseLine
