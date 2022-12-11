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
/*     Update: 2022/12/11 00:02:36 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { classColor } from "types/classColor"
import { weekAlternance } from "types/weekAlternance"

export default class Class {
    private _UVname: string
    private _day: string
    private _place: string
    private _start: string
    private _end: string
    private _frequence: string
    private _classType: string
    private _classReference: number
    private _week: weekAlternance
    private _color: classColor

    constructor(
        obj: {
            UVname: string,
            classType: string,
            classReference: number,
            day: string,
            start: string,
            end: string,
            place: string,
            frequence: string,
            week: weekAlternance,
            color: classColor,
        }
    ) {
        this._UVname = obj.UVname
        this._day = obj.day
        this._start = obj.start
        this._end = obj.end
        this._place = obj.place
        this._frequence = obj.frequence
        this._classType = obj.classType
        this._classReference = obj.classReference
        this._week = obj.week
        this._color = obj.color
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

    set UVname(value: string) {
        this._UVname = value
    }

    get day() {
        return this._day
    }

    set day(value: string) {
        this._day = value
    }

    get place() {
        return this._place
    }

    set place(value: string) {
        this._place = value
    }

    get start() {
        return this._start
    }

    set start(value: string) {
        this._start = value
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

    set end(value: string) {
        this._end = value
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

    set frequence(value: string) {
        this._frequence = value
    }

    get classType() {
        return this._classType
    }

    set classType(value: string) {
        this._classType = value
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

    set classReference(value: number) {
        this._classReference = value
    }

    get week() {
        return this._week
    }

    set week(value: weekAlternance) {
        this._week = value
    }
    
    get color() {
        return this._color
    }
}
