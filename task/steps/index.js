const fetch = require('node-fetch')
const qs = require('querystring')

const Utils = require('../../lib/utils')
const list = require('./list.json')

const url = 'http://api.eyoutw.com/fed/test/steps/submit.php'

list.forEach(data => {
    // 遍历json数据后发出请求
    data.step = Utils.random(1e4, 2e4)
    fetch(`${url}?${qs.stringify(data)}`)
})