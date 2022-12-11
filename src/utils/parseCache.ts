/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     parseCache.ts                                      ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/10 22:34:36 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Class } from 'utils'

const parseCache = (cache: string | null, object_type: 'Classes' | null): any => {
    if (cache === null)
        return null

    const json_object = JSON.parse(cache)
    const without_underscore = json_object.map((o: any) => {
        const new_object: any = {}
        for (const key in o) {
            new_object[key.replace('_', '')] = o[key]
        }
        return new_object
    })
    switch (object_type) {
        case 'Classes':
            return without_underscore.map((c: any) => new Class(c))
        default:
            return null
    }
}

export default parseCache