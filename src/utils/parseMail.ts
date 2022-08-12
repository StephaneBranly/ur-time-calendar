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
/*     Update: 2022/08/12 15:08:45 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Class, parseLine } from 'utils'

const parseMail = (content: string): Class[] => {
    const lines = content.split('\n')
    const classes: Class[] = []
    const uvs: string[] = []
    lines.forEach((line) => {
        const result = parseLine(line, uvs)
        if (result) {
            classes.push(result)
            if (!uvs.includes(result.UVname)) {
                uvs.push(result.UVname)
            }
        }
    })

    return classes
}

export default parseMail
