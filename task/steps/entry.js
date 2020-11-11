/*
 * 刷步数的任务
 */

const axios = require('axios')
const Utils = require('../../lib/utils')
const API = require('./api.js')
const list = require('./list.json')
const data_json = require('./data')


axios.interceptors.response.use(
    response => {
        // 请求数据返回
        let data = response.data
        if (typeof data == 'string' && /\{|\}/.test(data)) {
            data = JSON.parse(data)
        }
        return Promise.resolve(data)
    },
    error => {
        console.log(error)
    }
)


console.log('开始刷步任务')

~(async function () {

    function getToken (login_token) {
        return axios.get(API.getToken, {
            params: {
                app_name: "com.xiaomi.hm.health",
                dn: "api-user.huami.com,api-mifit.huami.com,app-analytics.huami.com",
                login_token
            },
            headers: {
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9; MI 6 MIUI/20.6.18)'
            }
        })
    }

    function runStep (apptoken, userid) {

        let step = Utils.random(1e4, 2e4)
        let now = new Date()
        let today = Utils.timeFormat(now)
        now = Math.floor(now / 1e3)
        
        return axios.post(`${API.submit}?t=${now}`, {
            userid,
            last_sync_data_time: now,
            device_type: "0",
            last_deviceid: "DA932FFFFE8816E7",
            data_json: data_json(today, step)
        },
        {
            transformRequest: [data => {
                let arr = []
                Object.keys(data).forEach(key => {
                    arr.push(`${key}=${data[key]}`)
                })
                return arr.join('&')
            }],
            headers: {
                apptoken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9; MI 6 MIUI/20.6.18)'
            }
        })
    }

    for(let { account, login_token } of list) {
        
        // 提取信息
        let { token_info } = await getToken(login_token)

        if(!token_info) {
            console.error('login_token已失效，请重新获取')
            return
        }


        // 用户信息
        let { app_token, user_id } = token_info

        // 开始刷步
        let res = await runStep(app_token, user_id)

        if(typeof res !== 'object') return
        
        if(res.code == 1) console.log(`<${account}>刷步成功！`)
        else if(res.code == 0) console.error(`<${account}>刷步失败，app_token已失效！`)
        else console.error(`<${account}>刷步失败，未知错误.`)

    }

    console.log('刷步结束')

})()
