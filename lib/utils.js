// 工具包

// 随机范围整数
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

module.exports = {
    random
}