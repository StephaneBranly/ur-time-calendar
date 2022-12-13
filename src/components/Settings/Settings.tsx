/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     Settings.tsx                                       ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/13 14:47:02 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './Settings.scss'

import { FiSettings } from 'react-icons/fi'
import { useState } from 'react'
import { Class, Exam, isKifyAccepted, SemesterPlanning } from 'utils'
import { isMobile } from 'react-device-detect'
import { SettingsClasses, SettingsExams, SettingsSemester } from 'components'


export interface SettingsProps {
    setClasses: (classes: Class[]) => void
    setExams: (exams: Exam[]) => void
    defaultOpenValue?: boolean
    classes: Class[]
    exams: Exam[]
    semesterPlanning: SemesterPlanning
}

const Settings = (props: SettingsProps) => {
    const { setClasses, defaultOpenValue, classes, semesterPlanning, exams, setExams } = props
    const [open, setOpen] = useState<boolean>(defaultOpenValue ?? false)
    const [kifyAccepted, setKifyAccepted] = useState(isKifyAccepted())
    const [tab, setTab] = useState<'classes' | 'exams' | 'semester' | 'others'>('classes')

    const handleKifyClick = (e: any) => {
        setKifyAccepted(e.target.checked)
        localStorage.setItem('kify_accepted', e.target.checked)

        if (e.target.checked) {
            setClasses(classes)
            setExams(exams)
        }
    }

    const deleteCache = () => {
        const confirmed = window.confirm(
            'Etes-vous sûr.e de vouloir supprimer le contenu du cache (les emplois du temps enregistrés)?'
        )
        if (confirmed) {
            localStorage.removeItem('a22-schedule')
            localStorage.removeItem('classes')
            localStorage.removeItem('exams')
            localStorage.removeItem('view')
        }
    }

    const renderTab = () => {
        switch (tab) {
            case 'classes':
                return (
                    <SettingsClasses classes={classes} setClasses={setClasses} semesterPlanning={semesterPlanning} />
                )
            case 'exams':
                return (
                    <SettingsExams exams={exams} setExams={setExams} semesterPlanning={semesterPlanning} />
                )
            case 'semester':
                return (
                    <SettingsSemester semesterPlanning={semesterPlanning} />
                )
            case 'others':
                return (<>
                    <div className="settings-section">
                        <p>Accepte la mise en cache pour que ton emploi du temps soit sauvegardé sur ton appareil.</p>
                        <input
                            type={'checkbox'}
                            defaultChecked={kifyAccepted}
                            onClick={handleKifyClick}
                        />
                        <label>Accepter la mise en cache</label>
                        <p>
                            <button onClick={deleteCache}>
                                Supprimer le cache
                            </button>
                        </p>
                    </div>
                    <div className="settings-section">
                        <p>Développé avec ❤️ par <a href='https://github.com/StephaneBranly'>Stéphane Branly</a>.</p>
                        <p><a href='https://github.com/StephaneBranly/ur-time-calendar'>Code disponible sur Github</a>.</p>
                        <p>Paye moi un ☕️ si tu veux me soutenir : <a href='https://www.paypal.com/paypalme/StephaneBranly'>paypal</a>.</p>
                    </div>
                    </>
                )
        }
    }

    return open ? (
        <div className="settings-modal-fragment">
            <div
                className="settings-modal-background"
                onClick={() => setOpen(false)}
            ></div>
            <div className="settings-modal-content">
                {isMobile && <button className='settings-exit' onClick={() => setOpen(false)}>
                                Fermer x
                            </button>}
                <h1 className='settings-title'>Paramètres</h1>
                <div className='settings-tabs'>
                    <div className={tab === 'classes' ? 'settings-tab-active' : ''} onClick={() => setTab('classes')}>
                        Classes <span className='settings-tab-count'>{classes.length}</span>
                    </div>
                    <div className={tab === 'exams' ? 'settings-tab-active' : ''} onClick={() => setTab('exams')}>
                        Examens <span className='settings-tab-count'>{exams.length}</span>
                    </div>
                    <div className={tab === 'semester' ? 'settings-tab-active' : ''} onClick={() => setTab('semester')}>
                        Semestre <span className='settings-tab-count'>{semesterPlanning.semesterName}</span>
                    </div>
                    <div className={tab === 'others' ? 'settings-tab-active' : ''} onClick={() => setTab('others')}>
                        Autres
                    </div>
                </div>
                {renderTab()}
            </div>
        </div>
    ) : (
        <div className="settings-button" onClick={() => setOpen(true)}>
            <FiSettings />
        </div>
    )
}

export default Settings
