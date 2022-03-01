export const getDateFromDatetime = (date) => date.toISOString().split('T')[0]

export function getTodayDate() {
    return getDateFromDatetime(new Date())
}
