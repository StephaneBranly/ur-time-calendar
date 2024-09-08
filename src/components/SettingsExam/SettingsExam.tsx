/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     SettingsExam.tsx                                   ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/13 18:05:47 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './SettingsExam.scss'

import { useState } from 'react'
import { Exam } from 'utils'

export interface SettingsExamProps {
    exam: Exam
    setExam: (newClass: Exam | undefined) => void
}

const SettingsExam = (props: SettingsExamProps) => {
    const { exam, setExam } = props
    const [edit, setEdit] = useState<Exam | undefined>(undefined)

    const handlerDelete = () => {
        const response = window.confirm(
            'Voulez-vous vraiment supprimer cet examen ?'
        )
        if (response) {
            setExam(undefined)
        }
    }

    const handlerSave = () => {
        setExam(edit)
        setEdit(undefined)
    }

    const forceEditUpdate = () => {
        setEdit(Object.assign(Object.create(Object.getPrototypeOf(edit)), edit))
    }

    const handlerSetDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!edit) return
        const splitted = e.target.value.split('-')
        const startDate = new Date(
            Number(splitted[0]),
            Number(splitted[1]) - 1,
            Number(splitted[2])
        )
        const endDate = new Date(
            Number(splitted[0]),
            Number(splitted[1]) - 1,
            Number(splitted[2])
        )
        startDate.setMinutes(edit.start.getMinutes())
        startDate.setHours(edit.start.getHours())
        endDate.setMinutes(edit.end.getMinutes())
        endDate.setHours(edit.end.getHours())
        edit.start = startDate
        edit.end = endDate
    }

    const handlerSetTime = (
        e: React.ChangeEvent<HTMLInputElement>,
        target: 'start' | 'end'
    ) => {
        if (!edit) return
        const splitted = e.target.value.split(':')
        const date = new Date(edit.start)
        date.setMinutes(Number(splitted[1]))
        date.setHours(Number(splitted[0]))
        if (target === 'start') {
            edit.start = date
        } else {
            edit.end = date
        }
    }

    return (
        <div className="settings-exam">
            {edit ? (
                <div className={`exam-slot`}>
                    <div>{exam.prettyPrint()}</div>
                    <div className="settings-exam-editable-inputs">
                        <div className="settings-exam-editable-input">
                            <label htmlFor="UVname">Nom de l'UV</label>
                            <input
                                name="UVname"
                                type="text"
                                defaultValue={edit.UVname}
                                onChange={(e) => {
                                    edit.UVname = e.target.value
                                    forceEditUpdate()
                                }}
                            />
                        </div>
                        <div className="settings-exam-editable-input">
                            <label htmlFor="start">Début</label>
                            <input
                                name="start"
                                type="date"
                                defaultValue={`${edit.start.getFullYear()}-${
                                    edit.start.getMonth() + 1
                                }-${edit.start.getDate()}`}
                                onChange={handlerSetDate}
                            />
                            <input
                                name="start"
                                type="time"
                                defaultValue={edit.printTime(edit.start)}
                                onChange={(e) => handlerSetTime(e, 'start')}
                            />
                        </div>
                        <div className="settings-exam-editable-input">
                            <label htmlFor="end">Fin</label>
                            <input
                                name="end"
                                type="time"
                                defaultValue={edit.printTime(edit.end)}
                                onChange={(e) => handlerSetTime(e, 'end')}
                            />
                        </div>

                        <div className="settings-exam-editable-input">
                            <label htmlFor="place">Lieu</label>
                            <input
                                name="place"
                                type="text"
                                defaultValue={edit.place}
                                onChange={(e) => (edit.place = e.target.value)}
                            />
                        </div>

                        {edit.type === 'final' && (
                            <div className="settings-exam-editable-input">
                                <label htmlFor="seat">Place</label>
                                <input
                                    name="seat"
                                    type="text"
                                    defaultValue={edit.seat}
                                    onChange={(e) =>
                                        (edit.seat = e.target.value)
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div className="settings-grouped-buttons">
                        <button onClick={() => handlerSave()}>
                            Sauvegarder
                        </button>
                        <button onClick={() => setEdit(undefined)}>
                            Annuler
                        </button>
                        <button onClick={() => handlerDelete()}>
                            Supprimer
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className={`exam-slot can-be-opened`}
                    onClick={() =>
                        setEdit(
                            Object.assign(
                                Object.create(Object.getPrototypeOf(exam)),
                                exam
                            )
                        )
                    }
                >
                    <div>{exam.prettyPrint()}</div>
                </div>
            )}
        </div>
    )
}

export default SettingsExam
