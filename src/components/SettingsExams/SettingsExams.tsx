/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     SettingsExams.tsx                                  ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/13 13:35:03 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { SettingsExam } from 'components'
import { createRef } from 'react'
import { Exam, parseExamsMail, printDate, SemesterPlanning } from 'utils'
import './SettingsExams.scss'

export interface SettingsExamsProps {
    setExams: (exams: Exam[]) => void
    exams: Exam[]
    semesterPlanning: SemesterPlanning
}

const SettingsExams = (props: SettingsExamsProps) => {
    const { setExams, exams, semesterPlanning } = props

    const ref = createRef<HTMLTextAreaElement>()

    const handlerLoadData = () => {
        if (!ref.current) return
        const data = parseExamsMail(ref.current.value)
        setExams([...exams.filter((exam) => exam.type === "médian"), ...data])
    }

    const setExam = (examSlot?: Exam, newExam?: Exam) => {
        const filtered = exams.filter(c => c !== examSlot)
        if (newExam === undefined) {
            setExams(filtered)
            return
        }
        setExams([...filtered, newExam])
    }

    const placeHolder = `MT12	11/01/2021	de 08:00	à 09:30	SI S ASP	place 131
    LO21	15/01/2021	de 08:00	à 09:30	SI S ASP	place 151
    IA01	12/01/2021	de 08:00	à 09:30	SI S ASP	place 203
    `
    const finalExams = exams.filter((exam) => exam.type === "final")
    const medianExams = exams.filter((exam) => exam.type === "médian")

    const medians = semesterPlanning.referencedDays.filter(day => day.isMedian).sort((a, b) => { return (a.date.getTime() - b.date.getTime() < 0) ? -1 : 1})
    const finaux = semesterPlanning.referencedDays.filter(day => day.isFinal).sort((a, b) => { return (a.date.getTime() - b.date.getTime() < 0) ? -1 : 1})

    const startMedian = medians[0].date
    const endMedian = medians[medians.length - 1].date
    const startFinal = finaux[0].date
    const endFinal = finaux[finaux.length - 1].date

    return (<>
        <div className="settings-section">
            <h2 className="settings-subtitle">Médians - du {printDate(startMedian)} au {printDate(endMedian)}</h2>
            <div className='settings-all-exams'>
                {medianExams.map(
                    (exam, index) => (
                        <SettingsExam exam={exam} setExam={(newExam) => setExam(exam, newExam)} key={index} />
                    )
                )}
            </div>
            <button onClick={() => setExam(undefined, new Exam({
            UVname: "YZ89",
            type: "médian",
            start: new Date(),
            end: new Date(),
            place: "HDS",
            seet: '1'
        }))}>Ajouter un médian</button>
        </div>
        <div className="settings-section">
            <h2 className="settings-subtitle">Finaux - du {printDate(startFinal)} au {printDate(endFinal)}</h2>
            {finalExams.length === 0 ? <><textarea
                className="settings-textarea"
                ref={ref}
                placeholder={placeHolder}
            />
            <button onClick={handlerLoadData}>Charger</button> <button onClick={() => setExam(undefined, new Exam({
                UVname: "YZ89",
                type: "final",
                start: new Date(),
                end: new Date(),
                place: "HDS",
                seet: '1'
            }))}>Ajouter un final</button></>
            :
            <><div className='settings-all-exams'>
                {finalExams.map(
                        (exam, index) => (
                            <SettingsExam exam={exam} setExam={(newExam) => setExam(exam, newExam)} key={index} />
                        )
                    )}
                </div>
                <button onClick={() => setExam(undefined, new Exam({
                UVname: "YZ89",
                type: "final",
                start: new Date(),
                end: new Date(),
                place: "HDS",
                seet: '1'
            }))}>Ajouter un final</button></>}
        </div>
        </>
    )
}

export default SettingsExams
