/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     parseMail.ts                                       ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/12 23:22:25 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { classColor } from 'types/classColor'
import { Class, parseLine } from 'utils'

const parseMail = (content: string): Class[] => {
    const lines = content.split('\n')
    const classes: Class[] = []
    const uvsColors: Record<string, classColor> = {}
    lines.forEach((line) => {
        const results = parseLine(line, uvsColors)
        if (results) {
            classes.push(...results)
            if (!(results[0].UVname in uvsColors)) {
                uvsColors[results[0].UVname] = results[0].color
            }
        }
    })

    return classes
}

export default parseMail
