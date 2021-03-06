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
/*     Update: 2022/02/28 19:14:43 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './Settings.scss'

import { FiSettings } from 'react-icons/fi'
import { useState } from 'react'
import { PasteMail } from 'components'
import { Class } from 'utils'

export interface SettingsProps {
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>
    defaultOpenValue?: boolean
    defaultContent?: string
}

const Settings = (props: SettingsProps) => {
    const { setClasses, defaultOpenValue, defaultContent } = props
    const [open, setOpen] = useState<boolean>(defaultOpenValue ?? false)
    const [kifyAccepted, setKifyAccepted] = useState(
        localStorage.getItem('kify_accepted') ? true : false
    )
    const [lastContent, setLastContent] = useState<string>(defaultContent ?? '')

    const handleKifyClick = (e: any) => {
        setKifyAccepted(e.target.checked)
        localStorage.setItem('kify_accepted', e.target.checked)
    }

    const saveInCache = () => {
        localStorage.setItem('p22-schedule', lastContent)
    }

    const deleteCache = () => {
        const confirmed = window.confirm(
            'Etes-vous s??r.e de vouloir supprimer le contenu du cache (les emplois du temps enregistr??s)?'
        )
        if (confirmed) localStorage.removeItem('p22-schedule')
    }

    return open ? (
        <div className="settings-modal-fragment">
            <div
                className="settings-modal-background"
                onClick={() => setOpen(false)}
            ></div>
            <div className="settings-modal-content">
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
            </div>
        </div>
    ) : (
        <div className="settings-button" onClick={() => setOpen(true)}>
            <FiSettings />
        </div>
    )
}

export default Settings
