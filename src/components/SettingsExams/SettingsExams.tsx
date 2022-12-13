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
/*     Update: 2022/12/13 11:17:52 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { createRef } from 'react'
import { Exam, parseExamsMail } from 'utils'
// import './SettingsExams.scss'

export interface SettingsExamsProps {
    setExams: (exams: Exam[]) => void
    exams: Exam[]
}

const SettingsExams = (props: SettingsExamsProps) => {
    const { setExams } = props

    const ref = createRef<HTMLTextAreaElement>()

    const handlerLoadData = () => {
        if (!ref.current) return
        const data = parseExamsMail(ref.current.value)
        setExams(data)
    }

    const placeHolder = `MT12	11/01/2021	de 08:00	à 09:30	SI S ASP	place 131
    LO21	15/01/2021	de 08:00	à 09:30	SI S ASP	place 151
    IA01	12/01/2021	de 08:00	à 09:30	SI S ASP	place 203
    `

    return (
        <div className="settings-section">
            <h2 className="settings-subtitle">Médians</h2>
            <textarea
                className="settings-textarea"
                ref={ref}
                placeholder={placeHolder}
            />
            <button onClick={handlerLoadData}>Charger</button>
        </div>

    )
}

export default SettingsExams
