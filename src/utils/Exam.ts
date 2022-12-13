/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     Exam.ts                                            ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/13 14:15:06 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */


export default class Exam {
    private _UVname: string
    private _place: string
    private _seet?: string
    private _start: Date
    private _end: Date
    private _type: 'médian' | 'final'

    constructor(
        obj: {
            UVname: string,
            start: Date,
            end: Date,
            place: string,
            seet?: string
            type: 'médian' | 'final',
        }
    ) {
        this._UVname = obj.UVname
        this._start = obj.start
        this._end = obj.end
        this._place = obj.place
        this._seet = obj.seet
        this._type = obj.type
    }

    prettyPrint = (): string => {
        return `${this.UVname}`
    }

    get UVname() {
        return this._UVname
    }

    set UVname(value: string) {
        this._UVname = value
    }

    get type() {
        return this._type
    }

    set type(value: 'médian' | 'final') {
        this._type = value
    }

    get place() {
        return this._place
    }

    set place(value: string) {
        this._place = value
    }

    get seet() {
        return this._seet
    }

    set seet(value: string | undefined) {
        this._seet = value
    }

    get start() {
        return this._start
    }

    set start(value: Date) {
        this._start = value
    }

    get end() {
        return this._end
    }

    set end(value: Date) {
        this._end = value
    }

    printTime = (date: Date): string => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }
}
