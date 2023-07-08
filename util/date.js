export function getFormattedDate(date) {
    const monthDesc = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    return ` ${date.getDate()}-${monthDesc[date.getMonth()]}-${date.getFullYear()} `
}

export function getDateMinusDays(date, minusDays) {
    //console.log('Input date: ', date)
    const outputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - minusDays)
    //console.log('Output date: ', outputDate)
    return outputDate
}   