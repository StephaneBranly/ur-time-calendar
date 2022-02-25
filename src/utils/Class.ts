/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     Class.ts                                           ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/02/25 01:10:01 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

export default class Class {
    private _UVname: string
    private _day: string
    private _place: string
    private _start: string
    private _end: string
    private _frequence: string
    private _classType: string
    private _classReference: number
    private _week: 'A' | 'B' | undefined

    constructor(
        UVname: string,
        classType: string,
        classReference: number,
        day: string,
        start: string,
        end: string,
        place: string,
        frequence: string,
        week: 'A' | 'B' | undefined
    ) {
        this._UVname = UVname
        this._day = day
        this._start = start
        this._end = end
        this._place = place
        this._frequence = frequence
        this._classType = classType
        this._classReference = classReference
        this._week = week
    }

    prettyPrint = (): string => {
        return `${this.UVname} - de ${this.start} à ${this.end} en salle ${this.place}`
    }

    private splitTime = (time: string, property: 'min' | 'hour') => {
        return Number(time.split(':')[property === 'min' ? 1 : 0])
    }

    get UVname() {
        return this._UVname
    }
    get day() {
        return this._day
    }
    get place() {
        return this._place
    }
    get start() {
        return this._start
    }
    get startHour() {
        return this.splitTime(this._start, 'hour')
    }
    get startMin() {
        return this.splitTime(this._start, 'min')
    }
    get end() {
        return this._end
    }
    get endHour() {
        return this.splitTime(this._end, 'hour')
    }
    get endMin() {
        return this.splitTime(this._end, 'min')
    }
    get frequence() {
        return this._frequence
    }
    get classType() {
        return this._classType
    }
    get prettyClassType() {
        switch (this._classType) {
            case 'C':
                return 'Cours'
            case 'D':
                return 'TD'
            case 'T':
                return 'TP'
        }
        return undefined
    }
    get classReference() {
        return this._classReference
    }
    get week() {
        return this._week
    }
}
