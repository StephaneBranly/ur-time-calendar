/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     SettingsClasses.tsx                                ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/11 22:24:22 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import { ClassSlot, PasteMail, SettingsClass } from 'components'
import { useState } from 'react'
import { Class, isKifyAccepted, saveFile, SemesterPlanning, toICS } from 'utils'

export interface SettingsClassesProps {
    classes: Class[]
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>
    semesterPlanning: SemesterPlanning
}

const SettingsClasses = (props: SettingsClassesProps) => {
    const { classes, setClasses, semesterPlanning } = props

    const [loadFromMail, setLoadFromMail] = useState<boolean>(classes.length === 0)
    const [selectedClass, setSelectedClass] = useState<Class|undefined>(undefined)
    const [copySelectedClass, setCopySelectedClass] = useState<Class|undefined>(undefined)

    const handlerLoadFromMail = (loaded_classes: Class[]) => {
        if (loaded_classes.length === 0) {
            alert("L'emploi du temps n'a pas pu être chargé. Vérifiez que vous avez bien copié le mail complet.")
            return
        }
        if (classes.length !== 0) {
            const confirmed = window.confirm(
                "Etes-vous sûr.e de vouloir écraser l'ancien emploi du temps chargé?"
            )
            if (!confirmed) 
                return
        }
        setClasses(loaded_classes)
        setLoadFromMail(false)
    }

    const handlerDeleteClasses = () => {
        const confirmed = window.confirm(
            "Etes-vous sûr.e de vouloir supprimer toutes les classes de l'emploi du temps?"
        )
        if (!confirmed) 
            return
        setClasses([])
        setLoadFromMail(true)
    }

    const setClass = (classSlot?: Class, newClass?: Class) => {
        const filtered = classes.filter(c => c !== classSlot)
        if (newClass === undefined) {
            setClasses(filtered)
            return
        }
        setClasses([...filtered, newClass])
    }

    if(loadFromMail) {
        return <div className='settings-section'>
            <PasteMail setClasses={handlerLoadFromMail} />
        </div>
    }
    return <>
        <div className='settings-section'>
            <button onClick={() => handlerDeleteClasses()}>Supprimer</button>
            <button 
                onClick={() => saveFile('calendrier.ics', toICS(semesterPlanning, classes))}>
                    Exporter au format .ics
            </button>
        </div>
        <div className='settings-section'>
            {classes.sort((a,b) => {return a.UVname < b.UVname ? -1 : 1}).map((c, key) => (
                <SettingsClass 
                key={key}
                class_={c}
                setClass={(newClass) => setClass(c, newClass)}
                />
            ))}
            <button onClick={() => setClass(undefined, new Class({
            UVname: "YZ89",
            classType: "C",
            classReference: 1,
            day: "LUNDI",
            start: "08:00",
            end: "10:00",
            place: "BF100",
            frequence: '1',
            week: undefined,
            color: undefined,
        }))}>Ajouter une classe</button>
        </div>
        </>
}

export default SettingsClasses
