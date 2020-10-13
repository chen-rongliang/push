const Addressing = require('./lib/addressing')

// 遍历可执行文件后，开始运行任务
Addressing('task', 'js').forEach(entry => {
    require(`./${entry}`)
})