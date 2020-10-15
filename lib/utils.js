// 工具包

// 随机范围整数
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

// 日期格式化
var plusZero = num => num > 9 ? num : `0${num}`
const timeFormat = (t, format = 'yyyy-mm-dd') => {
    if (t instanceof Date) {
        let y = t.getFullYear(), // 年份
            m = plusZero(t.getMonth() + 1), // 月份
            d = plusZero(t.getDate()), // 日期

            h = plusZero(t.getHours()), // 小时
            M = plusZero(t.getMinutes()), // 分钟
            s = plusZero(t.getSeconds()) // 秒

        let temp = format
        temp = temp.replace(/yyyy/g, y)
        temp = temp.replace(/mm/g, m)
        temp = temp.replace(/dd/g, d)
        temp = temp.replace(/hh/g, h)
        temp = temp.replace(/MM/g, M)
        temp = temp.replace(/ss/g, s)

        return temp
    } else {
        return '--/--/--'
    }
}

module.exports = {
    random,
    timeFormat
}