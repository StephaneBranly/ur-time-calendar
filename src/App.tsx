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
/*     Update: 2022/08/21 14:24:19 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import React, { useEffect, useState } from 'react'
import './App.css'
import { Calendar, Settings } from 'components'
import { Class, parseMail, SemesterPlanning } from 'utils'
import { getA22organization } from 'data'

function App() {
    const [classes, setClasses] = useState<Class[]>([])
    const [semesterOrganization, setSemesterOrganization] =
        useState<SemesterPlanning>(getA22organization)

    useEffect(() => {
        const kify = localStorage.getItem('kify_accepted')
        const a22Schedule = localStorage.getItem('a22-schedule')
        if (kify && a22Schedule) {
            const result = parseMail(a22Schedule)
            setClasses(result)
        }
    }, [])

    return (
        <div className="App">
            <div className="calendar-container">
                <Calendar
                    classes={classes}
                    semesterPlanning={semesterOrganization}
                />
            </div>
            <Settings
                setClasses={setClasses}
                defaultOpenValue={localStorage.getItem('a22-schedule') ? false : true}
                defaultContent={localStorage.getItem('a22-schedule') ?? ''}
            />
        </div>
    )
}

export default App
