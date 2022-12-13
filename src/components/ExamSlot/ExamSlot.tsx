/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     ExamSlot.tsx                                       ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/13 18:05:47 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { Exam } from 'utils'
import { CgPin } from 'react-icons/cg'
import { BsClock } from 'react-icons/bs'

import './ExamSlot.scss'

export interface ExamSlotProps {
    unit: Exam
    selected: boolean
    setSelected: () => void
    colStartIndex: number
    colEndIndex: number
    rowStartIndex: number
    rowEndIndex: number
}

const ExamSlot = (props: ExamSlotProps) => {
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
            className={`exam-slot ${
                selected ? 'selected' : ''
            } col-start-${colStartIndex} col-end-${colEndIndex} row-start-${rowStartIndex} row-end-${rowEndIndex}`}
            onClick={() => setSelected()}
        >
            <span className="exam-slot-uvname">
                {unit.UVname} - {unit.type}
            </span>
            <span className="exam-slot-place exam-label">
                <CgPin />
                {`${unit.place}`} {unit.seat? `, ${unit.seat}`:''}
            </span>
            {selected && (
                <span className="exam-slot-time">
                    <BsClock />
                    {` de ${unit.printTime(unit.start)} à ${unit.printTime(unit.end)}`}
                </span>
            )}
        </div>
    )
}

export default ExamSlot
