const parseDay = (day: string): string | undefined => {
    const dayUpper = day.toUpperCase()
    if (dayUpper.includes('LUN')) return 'LUNDI'
    if (dayUpper.includes('MAR')) return 'MARDI'
    if (dayUpper.includes('MER')) return 'MERCREDI'
    if (dayUpper.includes('JEU')) return 'JEUDI'
    if (dayUpper.includes('VEN')) return 'VENDREDI'
    if (dayUpper.includes('SAM')) return 'SAMEDI'
    return undefined
}

export default parseDay
