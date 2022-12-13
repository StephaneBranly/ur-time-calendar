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
/*     Update: 2022/12/12 23:00:37 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import React, { useEffect, useState } from 'react'
import './App.css'
import { Calendar, Notif, Settings } from 'components'
import { Class, loadFromLocalStorage, parseCache, saveToCache, SemesterPlanning } from 'utils'
import { getA22organization } from 'data'
import { notifType } from 'types/notifType'

function App() {
    const [classes, setClasses] = useState<Class[]>([])
    const [semesterOrganization, setSemesterOrganization] =
        useState<SemesterPlanning>(getA22organization)
    const [notif, setNotif] = useState<[string, notifType] | undefined>(['Hello world', 'info'])

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
        const a22Classes = loadFromLocalStorage('a22-classes')
        if (a22Classes) {
            const result = parseCache(a22Classes, "Classes")
            setClasses(result)
        }
    }, [])

    const handlerSetClasses = (classes: Class[]) => {
        const to_string = JSON.stringify(classes)
        setClasses(parseCache(to_string, "Classes")) // only way found to force update when changing class name
        const r = saveToCache(JSON.stringify(classes), "a22-classes")
        if (r)
            handlerSetNotifs(['Classes sauvegardées', 'success'])
        else
            handlerSetNotifs(['Accepte la mise en cache pour sauvegarder', 'warning'])
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
            <Notif isOpen={notif?true:false} notif={notif} setOpen={setOpen}/>
        </div>
    )
}

export default App
