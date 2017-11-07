/**
 * Created by xyShi on 10/31/17.
 */
module.exports = {
    host : {
        local: '',
        QA_CampaignService: 'https://106.15.62.84:8004',
        UAT_CampaignService: 'http://106.15.61.164:8004',
        QA_DatService: 'https://106.15.62.84:8007',
        UAT_DataService: 'http://106.15.61.164:8007'
    },
    env: process.env.NODE_ENV || 'QA_CampaignService'
};
