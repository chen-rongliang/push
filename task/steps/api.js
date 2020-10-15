// 接口
const HOST = 'http://sports.lifesense.com/'
const API = {
    login: `${HOST}sessions_service/login?systemType=2&version=4.6.7`,
    submit: `${HOST}sport_service/sport/sport/uploadMobileStepV2?version=4.5&systemType=2`
}

module.exports = API