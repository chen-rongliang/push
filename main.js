const Addressing = require('./lib/addressing')

// 遍历可执行文件后，开始运行任务
let task = Addressing('task', 'js')
Object.keys(task).forEach(name => {
    // 限制一下，只运行目录下的entry.js
    if(/entry\.js/.test(name)) {
        require(`./${task[name]}`)
    }
})