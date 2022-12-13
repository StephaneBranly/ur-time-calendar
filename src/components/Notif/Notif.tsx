/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     Notif.tsx                                          ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/12 22:34:06 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { notifType } from 'types/notifType'
import './Notif.scss'

export interface NotifProps {
    setOpen: (open: boolean) => void
    isOpen: boolean
    notif?: [string, notifType]
}

const Notif = (props: NotifProps) => {
    const { setOpen, isOpen, notif } = props

    if (!isOpen || !notif)
        return null
    return (
        <div className={`notif ${notif[1]}`} onClick={() => setOpen(false)}>
            {notif[0]}
        </div>
    )
}

export default Notif
