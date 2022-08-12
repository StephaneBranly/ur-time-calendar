/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     ClassSlot.tsx                                      ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/08/12 15:11:17 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Class } from 'utils'
import { CgPin } from 'react-icons/cg'
import { RiBook2Line } from 'react-icons/ri'
import { BsClock } from 'react-icons/bs'

import './ClassSlot.scss'

export interface ClassSlotProps {
    unit: Class
    selected: boolean
    setSelected: () => void
    colStartIndex: number
    colEndIndex: number
    rowStartIndex: number
    rowEndIndex: number
}

const ClassSlot = (props: ClassSlotProps) => {
    const {
        unit,
        colStartIndex,
        colEndIndex,
        rowStartIndex,
        rowEndIndex,
        selected,
        setSelected,
    } = props

    return (
        <div
            className={`class-slot ${unit.color} ${
                selected ? 'selected' : ''
            } col-start-${colStartIndex} col-end-${colEndIndex} row-start-${rowStartIndex} row-end-${rowEndIndex}`}
            onClick={() => setSelected()}
        >
            <span className="class-slot-uvname">
                <RiBook2Line />
                {unit.UVname} - {unit.prettyClassType} {unit.classReference}
            </span>
            <span className="class-slot-place class-label">
                <CgPin />
                {unit.place}
            </span>
            {selected && (
                <span className="class-slot-time">
                    <BsClock />
                    {` de ${unit.start} à ${unit.end}`}
                </span>
            )}
        </div>
    )
}

export default ClassSlot
