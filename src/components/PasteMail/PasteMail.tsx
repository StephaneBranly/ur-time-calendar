import { parse } from 'node:path/win32'
import { createRef, useEffect } from 'react'
import { Class, parseMail } from 'utils'
import './PasteMail.scss'

export interface PasteMailProps {
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>
    description?: string | JSX.Element
}

const PasteMail = (props: PasteMailProps) => {
    const { setClasses } = props

    const ref = createRef<HTMLTextAreaElement>()

    const handlerLoadData = () => {
        if(!ref.current) return
        const data =  parseMail(ref.current.value)
        setClasses(data)
    }

    useEffect(() => {
        const mail = `
     

 CM13       C 1     JEUDI... 10:15-12:15,F1,S=FA106   
 CM13       D 2     MARDI... 16:30-18:30,F1,S=FA420   
 CM13       T 1 A   JEUDI... 14:30-18:30,F2,S=ES109   

 LA13       D14     MERCREDI 10:15-12:15,F1,S=FC207   

 LO01       C 1     LUNDI... 08:00-10:00,F1,S=FA104   
 LO01       D 2     MERCREDI 14:15-16:15,F1,S=FA309   
 LO01       T 4 A   MERCREDI 16:30-18:30,F2,S=FB116   

 NF02       C 1     MARDI... 08:30-10:00,F1,S=FA108   
 NF02       D 1     MARDI... 10:15-12:15,F1,S=FA417   
 NF02       T 3 B   MARDI... 14:15-16:15,F2,S=J210C   

 SC21       C 1     LUNDI... 14:15-16:15,F1,S=FA108   
 SC21       D 3     LUNDI... 18:30-19:30,F1,S=FA306   

 SY01       C 1     VENDREDI 10:15-12:15,F1,S=FA205   
 SY01       D 4     JEUDI... 08:00-10:00,F1,S=FA616   

 TC00       D 1     MARDI... 18:45-20:45,F1,S=FA100   
 
 
 
       
        `
        const data = parseMail(mail)
        setClasses(data)
    }, [])
    return (
        <div className="pastemail">
            <div className="pastemail-content">
                <textarea ref={ref} />
            </div>
            <button onClick={handlerLoadData}>Charger</button>
        </div>
    )
}

export default PasteMail