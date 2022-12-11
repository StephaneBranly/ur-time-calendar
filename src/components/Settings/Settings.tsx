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
/*     Update: 2022/12/10 22:13:38 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './Settings.scss'

import { FiSettings } from 'react-icons/fi'
import { useState } from 'react'
import { PasteMail } from 'components'
import { Class, isKifyAccepted, saveFile, SemesterPlanning, toICS } from 'utils'
import { isMobile } from 'react-device-detect'

export interface SettingsProps {
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>
    defaultOpenValue?: boolean
    defaultContent?: string
    classes: Class[]
    semesterPlanning: SemesterPlanning
}

const Settings = (props: SettingsProps) => {
    const { setClasses, defaultOpenValue, defaultContent, classes, semesterPlanning } = props
    const [open, setOpen] = useState<boolean>(defaultOpenValue ?? false)
    const [kifyAccepted, setKifyAccepted] = useState(isKifyAccepted())
    const [lastContent, setLastContent] = useState<string>(defaultContent ?? '')

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
                <h1 className='settings-title'>Charger son emploi du temps depuis le mail SME</h1>
                <div className="settings-section">
                    <PasteMail
                        setClasses={setClasses}
                        defaultContent={defaultContent}
                        setLastContent={setLastContent}
                    />
                </div>
                <div className="settings-section">
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
                </div>
                <div className='settings-section'>
                        Développé avec ❤️ par <a href='https://github.com/StephaneBranly'>Stéphane Branly</a>.
                        <a href='https://github.com/StephaneBranly/ur-time-calendar'>Code disponible sur Github</a>.
                        Paye moi un ☕️ si tu veux me soutenir : <a href='https://www.paypal.com/paypalme/StephaneBranly'>paypal</a>.
                </div>
            </div>
        </div>
    ) : (
        <div className="settings-button" onClick={() => setOpen(true)}>
            <FiSettings />
        </div>
    )
}

export default Settings
