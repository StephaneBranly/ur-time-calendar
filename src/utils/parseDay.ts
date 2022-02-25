/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     parseDay.ts                                        ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/02/25 01:10:01 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

const parseDay = (day: string): string | undefined => {
    const dayUpper = day.toUpperCase()
    if (dayUpper.includes('LUN')) return 'LUNDI'
    if (dayUpper.includes('MAR')) return 'MARDI'
    if (dayUpper.includes('MER')) return 'MERCREDI'
    if (dayUpper.includes('JEU')) return 'JEUDI'
    if (dayUpper.includes('VEN')) return 'VENDREDI'
    if (dayUpper.includes('SAM')) return 'SAMEDI'
    return undefined
}

export default parseDay
