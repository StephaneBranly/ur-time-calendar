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
/*     Update: 2022/12/10 22:34:19 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import React, { useEffect, useState } from 'react'
import './App.css'
import { Calendar, Settings } from 'components'
import { Class, loadFromLocalStorage, parseCache, SemesterPlanning } from 'utils'
import { getA22organization } from 'data'

function App() {
    const [classes, setClasses] = useState<Class[]>([])
    const [semesterOrganization, setSemesterOrganization] =
        useState<SemesterPlanning>(getA22organization)

    useEffect(() => {
        const a22Schedule = loadFromLocalStorage('a22-schedule')
        if (a22Schedule) {
            const result = parseCache(a22Schedule, "Classes")
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
                // defaultOpenValue={loadFromLocalStorage('a22-schedule') ? false : true}
                defaultOpenValue={true}
                defaultContent={loadFromLocalStorage('a22-schedule') ?? ''} 
                classes={classes}
                semesterPlanning={semesterOrganization}
                />
        </div>
    )
}

export default App
