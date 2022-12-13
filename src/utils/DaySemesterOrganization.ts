/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     DaySemesterOrganization.ts                         ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/11 00:35:36 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { weekAlternance } from "types/weekAlternance"


export default class DaySemesterOrganization {
    private _date: Date
    private _weekAlternance: weekAlternance
    private _becomesA: string | undefined
    private _isHoliday: boolean | undefined
    private _isMedian: boolean | undefined
    private _isFinal: boolean | undefined
    private _isFerie: boolean | undefined

    constructor(
        date: Date,
        options?: {
            weekAlternance?: weekAlternance
            becomesA?:
                | 'Lundi'
                | 'Mardi'
                | 'Mercredi'
                | 'Jeudi'
                | 'Vendredi'
                | 'Samedi'
            isHoliday?: boolean
            isMedian?: boolean
            isFinal?: boolean
            isFerie?: boolean
        }
    ) {
        this._date = date
        this._weekAlternance = options?.weekAlternance
        this._becomesA = options?.becomesA
        this._isHoliday = options?.isHoliday
        this._isMedian = options?.isMedian
        this._isFinal = options?.isFinal
        this._isFerie = options?.isFerie
    }

    get date() {
        return this._date
    }
    get weekAlternance() {
        return this._weekAlternance
    }
    get becomesA() {
        return this._becomesA
    }
    get isHoliday() {
        return this._isHoliday
    }
    get isMedian() {
        return this._isMedian
    }

    get isFinal() {
        return this._isFinal
    }
    
    get isFerie() {
        return this._isFerie
    }
}
