/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     App.tsx                                            ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/02/28 19:11:38 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import React, { useEffect, useState } from 'react'
import './App.css'
import { Calendar, Settings } from 'components'
import { Class, parseMail } from 'utils'

function App() {
    const [classes, setClasses] = useState<Class[]>([])

    useEffect(() => {
        const kify = localStorage.getItem('kify_accepted')
        const p22Schedule = localStorage.getItem('p22-schedule')
        if (kify && p22Schedule) {
            const result = parseMail(p22Schedule)
            setClasses(result)
        }
    }, [])

    return (
        <div className="App">
            <div className="calendar-container">
                <Calendar view="compact" classes={classes} />
            </div>
            <Settings
                setClasses={setClasses}
                defaultOpenValue={classes.length !== 0}
                defaultContent={localStorage.getItem('p22-schedule') ?? ''}
            />
        </div>
    )
}

export default App
