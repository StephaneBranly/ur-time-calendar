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
/*     Update: 2022/02/25 21:33:32 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './Settings.scss'

import { FiSettings } from 'react-icons/fi'
import { useState } from 'react'
import { PasteMail } from 'components'
import { Class } from 'utils'

export interface SettingsProps {
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>
}

const Settings = (props: SettingsProps) => {
    const { setClasses } = props
    const [open, setOpen] = useState<boolean>(false)
    return open ? (
        <div className="settings-modal-fragment">
            <div
                className="settings-modal-background"
                onClick={() => setOpen(false)}
            ></div>
            <div className="settings-modal-content">
                <div className="settings-section">
                    <PasteMail setClasses={setClasses} defaultContent={''} />
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
