const fs = require('fs')

// 读取目录文件

class readFiles {
    constructor(filePath, ext) {
        this.files = []
        this.topDir = filePath
        this.reg = new RegExp('\.' + ext + '$')

        this.readFile(filePath)

    }
    readFile(filePath) {
        fs.readdirSync(filePath).forEach((file) => {
            let tmpPath = filePath + '/' + file
            let states = fs.statSync(tmpPath)
            if (states.isDirectory()) {
                // 如果是目录就继续往下
                this.readFile(tmpPath)
            } else {
                // 目标文件类型
                this.reg.test(file) && this.files.push(filePath + '/' + file)

            }
        })
    }
}

module.exports = (filePath, ext) => {
    return new readFiles(filePath, ext).files
}