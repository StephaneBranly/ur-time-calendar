/* *********************************************************************************************************************** */
/*  UTC Header                                                                                                             */
/*                                                        ::::::::::::::::::::       :::    ::: :::::::::::  ::::::::      */
/*     SettingsClass.tsx                                  ::::::::::::::::::::       :+:    :+:     :+:     :+:    :+:     */
/*                                                        ::::::::::::::+++#####+++  +:+    +:+     +:+     +:+            */
/*     By: branlyst <stephane.branly@etu.utc.fr>          ::+++##############+++     +:+    +:+     +:+     +:+            */
/*     https://github.com/StephaneBranly              +++##############+++::::       +#+    +:+     +#+     +#+            */
/*                                                      +++##+++::::::::::::::       +#+    +:+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       +#+    +#+     +#+     +#+            */
/*                                                        ::::::::::::::::::::       #+#    #+#     #+#     #+#    #+#     */
/*     Update: 2022/12/11 22:41:45 by branlyst            ::::::::::::::::::::        ########      ###      ######## .fr  */
/*                                                                                                                         */
/* *********************************************************************************************************************** */

import './SettingsClass.scss'

import { useState } from 'react'
import { Class } from 'utils'
import { weekAlternance } from 'types/weekAlternance'
import { classColor } from 'types/classColor'

export interface SettingsClassProps {
    class_: Class
    setClass: (newClass: Class | undefined) => void
}

const SettingsClass = (props: SettingsClassProps) => {
    const { class_, setClass } = props
    const [edit, setEdit] = useState<Class|undefined>(undefined)

    const handlerDelete = () => {
        const response = window.confirm('Voulez-vous vraiment supprimer cette classe ?')
        if (response) {
            setClass(undefined)
        }
    }

    const handlerSave = () => {
        setClass(edit)
        setEdit(undefined)
    }

    return <div className='settings-class'>
        {edit ? <div className={`class-slot ${edit.color}`}>
            <div>{class_.prettyPrint()}</div>
            <div className="settings-class-editable-inputs">
                <div className="settings-class-editable-input">
                    <label htmlFor="UVname">Nom de l'UV</label>
                    <input name="UVname" type='text' defaultValue={edit.UVname} onChange={(e) => edit.UVname = e.target.value} />
                </div>
                
                <div className="settings-class-editable-input">
                    <label htmlFor="classType">Type de créneau</label>
                    <select name="classType" defaultValue={edit.classType} onChange={(e) => edit.classType = e.target.value}>
                        <option value="C">Cours</option>
                        <option value="D">TD</option>
                        <option value="P">TP</option>
                    </select>
                </div>

                <div className="settings-class-editable-input">
                    <label htmlFor="classReference">ID du créneau</label>
                    <input name="classReference" type='number' defaultValue={edit.classReference} onChange={(e) => edit.classReference = Number(e.target.value)}/>
                </div>

                <div className="settings-class-editable-input">
                    <label htmlFor="day">Jour</label>
                    <select name="day" defaultValue={edit.day} onChange={(e) => edit.day= e.target.value }>
                        <option value="LUNDI">Lundi</option>
                        <option value="MARDI">Mardi</option>
                        <option value="MERCREDI">Mercredi</option>
                        <option value="JEUDI">Jeudi</option>
                        <option value="VENDREDI">Vendredi</option>
                        <option value="SAMEDI">Samedi</option>
                        <option value="DIMANCHE">Dimanche</option>
                    </select>
                </div>

                <div className="settings-class-editable-input">
                    <label htmlFor="start">Début</label>
                    <input name="start" type='time' defaultValue={edit.start} onChange={(e) => edit.start= e.target.value}/>
                </div>
                
                <div className="settings-class-editable-input">
                    <label htmlFor="end">Fin</label>
                    <input name="end" type='time' defaultValue={edit.end} onChange={(e) => edit.end= e.target.value}/>
                </div>

                <div className="settings-class-editable-input">
                    <label htmlFor="place">Lieu</label>
                    <input name="place" type='text' defaultValue={edit.place} onChange={(e) => edit.place= e.target.value}/>
                </div>

                <div className="settings-class-editable-input">
                    <label htmlFor="week">Alternance</label>
                    <select name="week" defaultValue={edit.week} onChange={(e) => edit.week= e.target.value as weekAlternance }>
                        <option value={undefined}>Aucune</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                </div>

                <div className="settings-class-editable-input">
                    <label htmlFor="color">Couleur</label>
                    <select name="color" defaultValue={edit.color} onChange={(e) => edit.color= e.target.value as classColor} >
                        {['lagon', 'starfall', 'orange-coral', 'sulfur', 'barbapapa', 'cool-blues' ].map((color) => <option value={color}>{color}</option>)}
                    </select>
                </div>
            </div>
            <div>

            <button onClick={() => handlerSave()}>Sauvegarder</button>
            <button onClick={() => setEdit(undefined)}>Annuler</button>
            <button onClick={() => handlerDelete()}>Supprimer</button>
            </div>
        </div> :
            <div className={`class-slot ${class_.color}`}  onClick={() => setEdit(Object.assign(Object.create(Object.getPrototypeOf(class_)), class_))} >
                <div>{class_.prettyPrint()}</div>
            </div>}
    </div>
}

export default SettingsClass
