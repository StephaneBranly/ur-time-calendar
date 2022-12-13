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
/*     Update: 2022/12/13 18:05:47 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Class, Exam } from 'utils'

const parseCache = (cache: string | null, object_type: 'Classes' | 'Exams' | null): any => {
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
        case 'Exams':
            return without_underscore.map((e: any) => 
                new Exam({
                    start: new Date(e.start),
                    end: new Date(e.end),
                    UVname: e.UVname,
                    place: e.place,
                    seat: e.seat,
                    type: e.type
                })
            )
        default:
            return null
    }
}

export default parseCache