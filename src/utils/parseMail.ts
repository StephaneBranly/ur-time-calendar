import { Class, parseLine } from "utils";

const parseMail = (content: string): Class[] => {
    const lines = content.split('\n')
    const classes: Class[] = []
    lines.forEach((line) => {
        const result = parseLine(line)
        if (result) classes.push(result)
    })

    return classes
}

export default parseMail