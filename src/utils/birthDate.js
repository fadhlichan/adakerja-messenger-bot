const TODAY = new Date()
const CURRENT_DATE = TODAY.getDate()
const CURRENT_MONTH = TODAY.getMonth()
const CURRENT_YEAR = TODAY.getFullYear()

exports.daysUntilNextBirthDay = birthDay => {
    let birthDate = birthDay.getDate()
    let birthMonth = birthDay.getMonth()

    let currentDay = getDays()
    let targetDay = getDays(birthDate, birthMonth)

    if (currentDay > targetDay) {
        // date of birth has passed
        const TOTAL_DAYS_IN_THE_YEAR = isLeapYear(CURRENT_YEAR) ? 366 : 365
        let targetDayNextYear = getDays(birthDate, birthMonth, CURRENT_YEAR + 1)

        return TOTAL_DAYS_IN_THE_YEAR - currentDay + targetDayNextYear
    }

    return targetDay - currentDay
}

const isLeapYear = year => {
    // Pseudocode from https://id.wikipedia.org/wiki/Tahun_kabisat
    if (year % 400 === 0) return true
    else if (year % 100 === 0) return false
    else if (year % 4 === 0) return true
    else return false
}

const getDays = (date = CURRENT_DATE, month = CURRENT_MONTH, year = CURRENT_YEAR) => {
    const MONTH_DAYS = [
        31, // January
        isLeapYear(year) ? 29 : 28, // February
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31  // December
    ]

    let days = MONTH_DAYS.slice(0, month).reduce((a, b) => a + b, date)
    return days
}