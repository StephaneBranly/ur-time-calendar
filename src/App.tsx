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
/*     Update: 2022/12/12 22:14:20 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import React, { useEffect, useState } from 'react'
import './App.css'
import { Calendar, Settings } from 'components'
import { Class, loadFromLocalStorage, parseCache, saveToCache, SemesterPlanning } from 'utils'
import { getA22organization } from 'data'

function App() {
    const [classes, setClasses] = useState<Class[]>([])
    const [semesterOrganization, setSemesterOrganization] =
        useState<SemesterPlanning>(getA22organization)

    useEffect(() => {
        const a22Classes = loadFromLocalStorage('a22-classes')
        if (a22Classes) {
            const result = parseCache(a22Classes, "Classes")
            setClasses(result)
        }
    }, [])

    const handlerSetClasses = (classes: Class[]) => {
        setClasses(classes)
        saveToCache(JSON.stringify(classes), "a22-classes")
    }

    return (
        <div className="App">
            <div className="calendar-container">
                <Calendar
                    classes={classes}
                    semesterPlanning={semesterOrganization}
                />
            </div>
            <Settings
                setClasses={handlerSetClasses}
                defaultOpenValue={loadFromLocalStorage('a22-schedule') ? false : true}
                classes={classes}
                semesterPlanning={semesterOrganization}
                />
        </div>
    )
}

export default App
