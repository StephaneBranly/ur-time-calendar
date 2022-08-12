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
/*     Update: 2022/08/12 15:28:57 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { classColor } from 'types/classColor'
import { Class, parseDay } from 'utils'

const parseLine = (line: string, uvs: string[]): Class | undefined => {
    const colors: classColor[] = ['barbapapa', 'cool-blues', 'lagon', 'orange-coral', 'sulfur', 'starfall']
    const match = line.match(
        /([A-Z0-9]{4})\s*(([A-Z]{1})\s([0-9]*)|([A-Z]{1})([0-9]*))\s([AB])?\s*([A-Z.]*)\s([0-9]{2}:[0-9]{2})-([0-9]{2}:[0-9]{2}),(F[0-9]),S=([A-Z0-9]*)/
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
        return new Class(
            UVname,
            classType,
            Number(classReference),
            day,
            start,
            end,
            place,
            frequence,
            week as 'A' | 'B' | undefined,
            color
        )
    }
    return undefined
}

export default parseLine
