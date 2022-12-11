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
/*     Update: 2022/12/10 22:32:27 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { classColor } from 'types/classColor'
import { Class, parseDay } from 'utils'

const parseLine = (line: string, uvs: string[]): Class[] | undefined => {
    const colors: classColor[] = ['barbapapa', 'cool-blues', 'lagon', 'orange-coral', 'sulfur', 'starfall']

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
        const color = uvs.includes(UVname) ? colors[uvs.indexOf(UVname)] : colors[(uvs.length % colors.length)]
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
