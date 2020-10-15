/*
 * 刷步数的任务
 * 这个是利用了乐心健康app的接口做处理的
 * 步骤1. 用手机号注册乐心健康账号，并设置密码
 * 步骤2. app内绑定同步支付宝和微信
 * 步骤3. md5步骤1中设置的密码，得到32位小写加密串
 * 步骤4. 在list.json中更替填写你自己的账号信息
 * 步骤5. 提交
 */

const fetch = require('node-fetch')
const Utils = require('../../lib/utils')
const API = require('./api.js')
const list = require('./list.json')

// post压缩
function post (url, data, headers) {
    return fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: Object.assign({
            'Content-Type': 'application/json; charset=utf-8'
        }, headers)
    }).then(res => res.json())
}

list.forEach(async ({ loginName, password }) => {
    // 遍历账号信息，开始登录
    const {code, data} = await post(API.login, {
        appType: 6,
        clientId: "88888",
        loginName,
        password,
        roleType: 0
    })

    // 登录成功
    if(code == 200) {
        console.log(`<${loginName}>登录成功!`)

        // 登录后参数提取
        const { accessToken, userId } = data
        // 步数模拟
        const step = Utils.random(1e4, 2e4)
        // 时间
        const time = new Date()

        // 开始刷步数
        post(API.submit, {
            list: [
                {
                    active: 1,
                    calories: Math.floor(step/4),
                    DataSource: 2,
                    dataSource: 2,
                    deviceId: "M_NULL",
                    distance: Math.floor(step/3),
                    exerciseTime: 0,
                    isUpload: 0,
                    measurementTime: Utils.timeFormat(time, 'yyyy-mm-dd hh:MM:ss'),
                    priority: 0,
                    step,
                    type: 2,
                    updated: time / 1,
                    userId
                }
            ]
        }, {
            Cookie: `accessToken=${accessToken}`
        }).then(({ code }) => {
            if(code == 200) {
                console.log(`<${loginName}>刷步成功!`)
            } else {
                console.error(`<${loginName}>刷步失败[code:${code}]`)
            }
        })

    } else {
        console.error(`登录失败[code:${code}]`)
    }
})
