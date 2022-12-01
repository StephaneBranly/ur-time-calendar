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
/*     Update: 2022/11/30 20:55:56 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
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
             <a href='https://framaforms.org/feedback-ur-time-calendar-1669858139' target='_blank' rel='noreferrer' className='feedback'>
                <div className="App-header">
                    Donne un feedback sur l'application
                </div>
            </a>
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
                classes={classes}
                semesterPlanning={semesterOrganization}
                />
        </div>
    )
}

export default App
