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
/*     Update: 2022/12/13 18:03:50 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import React, { useEffect, useState } from 'react'
import './App.css'
import { Calendar, Notif, Settings } from 'components'
import { Class, loadFromLocalStorage, parseCache, saveToCache, SemesterPlanning, Exam, parseClassesMail } from 'utils'
import { getA22organization } from 'data'
import { notifType } from 'types/notifType'

function App() {
    const [classes, setClasses] = useState<Class[]>([])
    const [exams, setExams] = useState<Exam[]>([])
    const [semesterOrganization, setSemesterOrganization] =
        useState<SemesterPlanning>(getA22organization)
    const [notif, setNotif] = useState<[string, notifType] | undefined>(undefined)

    const setOpen = (open: boolean) => {
        if (!open)
            setNotif(undefined)
    }

    const handlerSetNotifs = (notif: [string, notifType]) => {
        setNotif(notif)
        setTimeout(() => {
            setNotif(undefined)
        }
        ,2000)
    }

    useEffect(() => {
        const Classes = loadFromLocalStorage('classes')
        if (Classes) {
            const result = parseCache(Classes, "Classes")
            setClasses(result)
        }
        const Exams = loadFromLocalStorage('exams')
        if (Exams) {
            const result = parseCache(Exams, "Exams")
            setExams(result)
        }

        const oldClasses = loadFromLocalStorage('a22-schedule')
        if (oldClasses) {
            const result = parseClassesMail(oldClasses)
            setClasses(result)
            const r = saveToCache(JSON.stringify(result), "classes")
            if (r)
                handlerSetNotifs(['Classes sauvegardées', 'success'])
            localStorage.removeItem('a22-schedule')
        }
    }, [])

    const handlerSetClasses = (classes: Class[]) => {
        const to_string = JSON.stringify(classes)
        setClasses(parseCache(to_string, "Classes")) // only way found to force update when changing class name
        const r = saveToCache(JSON.stringify(classes), "classes")
        if (r)
            handlerSetNotifs(['Classes sauvegardées', 'success'])
        else
            handlerSetNotifs(['Accepte la mise en cache pour sauvegarder', 'warning'])
    }

    const handlerSetExams = (exams: Exam[]) => {
        const to_string = JSON.stringify(exams)
        setExams(parseCache(to_string, "Exams")) // only way found to force update when changing class name
        const r = saveToCache(JSON.stringify(exams), "exams")
        if (r)
            handlerSetNotifs(['Examens sauvegardées', 'success'])
        else
            handlerSetNotifs(['Accepte la mise en cache pour sauvegarder', 'warning'])
    }

    return (
        <div className="App">
            <div className="calendar-container">
                <Calendar
                    classes={classes}
                    exams={exams}
                    semesterPlanning={semesterOrganization}
                />
            </div>
            <Settings
                defaultOpenValue={loadFromLocalStorage('classes') ? false : true}
                setClasses={handlerSetClasses}
                classes={classes}
                setExams={handlerSetExams}
                exams={exams}
                semesterPlanning={semesterOrganization}
                />
            <Notif isOpen={notif?true:false} notif={notif} setOpen={setOpen}/>
        </div>
    )
}

export default App
