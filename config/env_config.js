/**
 * Created by xyShi on 10/31/17.
 */
module.exports = {
    host : {
        local: '',
        QA: 'https://192.168.1.1:8004',
        UAT: 'https://192.168.1.0:8004'
    },
    env: process.env.NODE_ENV || 'QA'
};
