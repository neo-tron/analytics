export function toISO8601(date: Date) {
    return (
        date.getFullYear() +
        '-' +
        getMonth(date) +
        '-' +
        getDate(date) +
        'T' +
        getHours(date) +
        ':' +
        getMinutes(date) +
        ':' +
        getSeconds(date) +
        '.' +
        getMilliseconds(date) +
        getTimezoneOffset(date)
    )
}

function getMonth(date: Date) {
    const month = String(date.getMonth())
    return addZero(month)
}

function getDate(date: Date) {
    const day = String(date.getDate())
    return addZero(day)
}

function getHours(date: Date) {
    const hours = String(date.getHours())
    return addZero(hours)
}

function getMinutes(date: Date) {
    const minutes = String(date.getMinutes())
    return addZero(minutes)
}

function getSeconds(date: Date) {
    const seconds = String(date.getSeconds())
    return addZero(seconds)
}

function getTimezoneOffset(date: Date) {
    const os = Math.abs(date.getTimezoneOffset())
    let h = String(Math.floor(os / 60))
    let m = String(os % 60)
    h.length === 1 ? (h = '0' + h) : h
    m.length === 1 ? (m = '0' + m) : m
    return date.getTimezoneOffset() < 0 ? '+' + h + ':' + m : '-' + h + ':' + m
}

function getMilliseconds(date: Date) {
    const milliseconds = String(date.getMilliseconds())
    if (milliseconds.length === 1) {
        return '00' + milliseconds
    } else if (milliseconds.length === 2) {
        return '0' + milliseconds
    }
    return milliseconds
}

function addZero(str: string) {
    return str.length === 1 ? '0' + str : str
}
