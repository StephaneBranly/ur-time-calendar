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
/*     Update: 2022/12/10 23:11:59 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './Settings.scss'

import { FiSettings } from 'react-icons/fi'
import { SetStateAction, useState } from 'react'
import { Class, isKifyAccepted, SemesterPlanning } from 'utils'
import { isMobile } from 'react-device-detect'
import { SettingsClasses } from 'components'


export interface SettingsProps {
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>
    defaultOpenValue?: boolean
    classes: Class[]
    semesterPlanning: SemesterPlanning
}

const Settings = (props: SettingsProps) => {
    const { setClasses, defaultOpenValue, classes, semesterPlanning } = props
    const [open, setOpen] = useState<boolean>(defaultOpenValue ?? false)
    const [kifyAccepted, setKifyAccepted] = useState(isKifyAccepted())
    const [tab, setTab] = useState<'classes' | 'exams' | 'semester' | 'about'>('classes')

    const handleKifyClick = (e: any) => {
        setKifyAccepted(e.target.checked)
        localStorage.setItem('kify_accepted', e.target.checked)
    }

    const saveInCache = () => {
        localStorage.setItem('a22-schedule', JSON.stringify(classes))
    }

    const deleteCache = () => {
        const confirmed = window.confirm(
            'Etes-vous sûr.e de vouloir supprimer le contenu du cache (les emplois du temps enregistrés)?'
        )
        if (confirmed) {
            localStorage.removeItem('a22-schedule')
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
                    <p>Charge les horaires de tes examens!</p>
                )
            case 'semester':
                return (
                    <p>Tu as de la chance, actuellement les semestres sont gérés par l'admin ;)</p>
                )
            case 'about':
                return (
                    <>
                        <p>Développé avec ❤️ par <a href='https://github.com/StephaneBranly'>Stéphane Branly</a>.</p>
                        <p><a href='https://github.com/StephaneBranly/ur-time-calendar'>Code disponible sur Github</a>.</p>
                        <p>Paye moi un ☕️ si tu veux me soutenir : <a href='https://www.paypal.com/paypalme/StephaneBranly'>paypal</a>.</p>
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
                        Examens <span className='settings-tab-count'>0</span>
                    </div>
                    <div className={tab === 'semester' ? 'settings-tab-active' : ''} onClick={() => setTab('semester')}>
                        Semestre <span className='settings-tab-count'>a22</span>
                    </div>
                    <div className={tab === 'about' ? 'settings-tab-active' : ''} onClick={() => setTab('about')}>
                        A propos
                    </div>
                </div>
                {renderTab()}
                {/* <div className="settings-section">
                    <input
                        type={'checkbox'}
                        checked={kifyAccepted}
                        onClick={handleKifyClick}
                    />
                    <label>Accepter la mise en cache</label>
                    {kifyAccepted ? (
                        <button onClick={saveInCache}>
                            Sauvergarder dans le cache
                        </button>
                    ) : (
                        <button onClick={deleteCache}>
                            Supprimer le cache
                        </button>
                    )}
                </div>
                <div className='settings-section'>
                    <button 
                        onClick={() => saveFile('calendrier.ics', toICS(semesterPlanning, classes))}>
                            Exporter au format .ics
                    </button>
                </div> */}
            </div>
        </div>
    ) : (
        <div className="settings-button" onClick={() => setOpen(true)}>
            <FiSettings />
        </div>
    )
}

export default Settings
