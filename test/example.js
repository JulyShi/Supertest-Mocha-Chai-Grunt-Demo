process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var config = require('../config/env_config'), request = require('supertest')(config.host[config.env]);
var chai = require('chai');
var expect = require('chai').expect;

var token;
var scheduleId;
var campaignId;
var HQ_targetPV;
var PD_targetPV;
var jsonType = 'application/json';
var username = 'username';
var password = 'password';

var now = new Date();
var client = "SuperAuto" + now.setDate(now.getDate()) + "client";
var brand = "SuperAuto" + now.setDate(now.getDate()) + "brand";

var startTimeHQ = (new Date()).setDate((new Date()).getDate() + 5);
var startTimePD = startTimeHQ;
var endTimeHQ = (new Date()).setDate((new Date()).getDate() + 15);
var endTimePD = (new Date()).setMonth(((new Date()).getMonth() + 1));

var scheduleRequestBody = {
    "client": client,
    "brand": brand,
    "targetingPV": "10",
    "adPositions": [
        "Pre"
    ],
    "positions": [
        {
            "name": "HQ",
            "allChecked": true,
            "terminals": [
                {
                    "name": "T1",
                    "allChecked": true,
                    "departures": [
                        {
                            "name": "DOM",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        },
                        {
                            "name": "INTL",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        }
                    ]
                },
                {
                    "name": "T2",
                    "allChecked": true,
                    "departures": [
                        {
                            "name": "DOM",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        }
                    ]
                },
                {
                    "name": "TC",
                    "allChecked": true,
                    "departures": []
                },
                {
                    "name": "Parking",
                    "allChecked": true,
                    "departures": []
                }
            ],
            "start": startTimeHQ,
            "end": endTimeHQ
        },
        {
            "name": "PD",
            "allChecked": true,
            "terminals": [
                {
                    "name": "T1",
                    "allChecked": true,
                    "departures": [
                        {
                            "name": "DOM",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        },
                        {
                            "name": "INTL",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        }
                    ]
                },
                {
                    "name": "T2",
                    "allChecked": true,
                    "departures": [
                        {
                            "name": "DOM",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        },
                        {
                            "name": "INTL",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        }
                    ]
                },
                {
                    "name": "TC",
                    "allChecked": true,
                    "departures": []
                },
                {
                    "name": "Parking",
                    "allChecked": true,
                    "departures": []
                }
            ],
            "start": startTimePD,
            "end": endTimePD
        }
    ],
    "comment": "this schedule is created by superTest automated!"
};
var update_scheduleRequestBody = {
    "client": client,
    "brand": brand,
    "targetingPV": "20",
    "adPositions": [
        "Pre"
    ],
    "positions": [
        {
            "name": "HQ",
            "allChecked": true,
            "terminals": [
                {
                    "name": "T1",
                    "allChecked": true,
                    "departures": [
                        {
                            "name": "DOM",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        },
                        {
                            "name": "INTL",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        }
                    ]
                },
                {
                    "name": "T2",
                    "allChecked": true,
                    "departures": [
                        {
                            "name": "DOM",
                            "allChecked": true,
                            "areas": [
                                "Check-in",
                                "Security Check&Immigration",
                                "Boarding Hall",
                                "Arrival Corridor",
                                "Luggage Claim",
                                "Meeters'&Greeters'Area",
                                "VIP"
                            ]
                        }
                    ]
                },
                {
                    "name": "TC",
                    "allChecked": true,
                    "departures": []
                },
                {
                    "name": "Parking",
                    "allChecked": true,
                    "departures": []
                }
            ],
            "start": startTimeHQ,
            "end": endTimeHQ
        },
    ],
    "comment": "this schedule is created by superTest automated"
};


describe('Feature: E2E test of schedule to campaign. Create a booking -> Edit booking -> Block -> Edit block-> Send to Cmapaign -> Upload Metarial -> Approvel -> Launch',function() {

    before('Given login the system', function (done) {
        this.timeout(10000);
        var login_requestbody = {
            "username": username,
            "password": password
        };
        request.post('/auth')
            .send(login_requestbody)
            .expect(200)
            .expect(function (res) {
                token = res.body.token;
                expect(res.body.name).to.equal(username)
            }).end(done)
    });

    describe('Stage: E2E test of schedule',function() {

        it('When new a booking', function (done) {
            this.timeout(10000);
            request.post('/schedules')
                .set('Authorization', token)
                .set('Content-Type', jsonType)
                .send(scheduleRequestBody)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.client).to.equal(client);
                    expect(res.body.brand).to.equal(brand);
                    scheduleId = res.body.id;
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('Then get booking details', function (done) {
            this.timeout(10000);
            request.get('/schedules' + '/' + scheduleId)
                .set('Authorization', token)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(scheduleId);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('When update booking', function (done) {
            this.timeout(10000);
            request.put('/schedules' + '/' + scheduleId)
                .set('Authorization', token)
                .set('Content-Type', jsonType)
                .send(update_scheduleRequestBody)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(scheduleId);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('Then get updated booking details', function (done) {
            this.timeout(10000);
            request.get('/schedules' + '/' + scheduleId)
                .set('Authorization', token)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(scheduleId);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('When block the schedule', function (done) {
            this.timeout(10000);
            request.post('/schedules' + '/' + scheduleId + '/block')
                .set('Authorization', token)
                .set('Content-Type', jsonType)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(scheduleId);
                    expect(res.body.client).to.equal(client);
                    expect(res.body.brand).to.equal(brand);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('Then get block details', function (done) {
            this.timeout(10000);
            request.get('/schedules' + '/' + scheduleId)
                .set('Authorization', token)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(scheduleId);
                    expect(res.body.client).to.equal(client);
                    expect(res.body.brand).to.equal(brand);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('When update block', function (done) {
            this.timeout(10000);
            request.put('/schedules' + '/' + scheduleId)
                .set('Authorization', token)
                .set('Content-Type', jsonType)
                .send(scheduleRequestBody)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(scheduleId);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('Then get updated block details', function (done) {
            this.timeout(10000);
            request.get('/schedules' + '/' + scheduleId)
                .set('Authorization', token)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(scheduleId);
                    expect(res.body.client).to.equal(client);
                    expect(res.body.brand).to.equal(brand);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('When send to Campaign', function (done) {
            this.timeout(10000);
            request.post('/schedules' + '/' + scheduleId + '/send-to-campaign')
                .set('Authorization', token)
                .set('Content-Type', jsonType)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.scheduleId).to.equal(scheduleId);
                    expect(res.body.client).to.equal(client);
                    expect(res.body.brand).to.equal(brand);
                    HQ_targetPV = res.body.positions[0].targetingPV;
                    PD_targetPV = res.body.positions[1].targetingPV;
                    campaignId = res.body.id;
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('Then get sent to campaign block details', function (done) {
            this.timeout(10000);
            request.get('/schedules' + '/' + scheduleId)
                .set('Authorization', token)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(scheduleId);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });
    });

    describe('Stage: E2E test of campaign',function() {

        it('And get draft campaign', function (done) {
            this.timeout(10000);
            request.get('/campaign' + '/' + campaignId)
                .set('Authorization', token)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.id).to.equal(campaignId);
                    expect(res.body.client).to.equal(client);
                    expect(res.body.brand).to.equal(brand);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('When upload metrial', function (done) {
            this.timeout(10000);
            //noinspection JSUnresolvedFunction
            request.post('/material')
                .set('Authorization', token)
                //.set('Accept', 'application/text' )
                .attach('file', './doc/automation.png')
                .expect(200)
                .expect(function (res) {
                    PicAddress = res.body.fileId;
                }).end(done)
        });

        it('Then I can submit draft campaign', function (done) {
            this.timeout(10000);
            var campaignRequestBody = {
                "id": campaignId,
                "client": client,
                "brand": brand,
                "languages": [
                    "CN",
                    "EN"
                ],
                "adPosition": "Pre",
                "progressBarColor": "RGB(51, 193, 241)",
                "skipBtnColor": "RGB(77, 87, 100)",
                "skipBtnTransparency": null,
                "statisticalCode": null,
                "positions": [
                    {
                        "name": "HQ",
                        "start": startTimeHQ,
                        "end": endTimeHQ,
                        "targetingPV": HQ_targetPV,
                        "terminals": [
                            {
                                "name": "T1",
                                "departures": [
                                    {
                                        "name": "DOM",
                                        "areas": [
                                            "Check-in",
                                            "Security Check&Immigration",
                                            "Boarding Hall",
                                            "Arrival Corridor",
                                            "Luggage Claim",
                                            "Meeters'&Greeters'Area",
                                            "VIP"
                                        ],
                                        "allChecked": true
                                    },
                                    {
                                        "name": "INTL",
                                        "areas": [
                                            "Check-in",
                                            "Security Check&Immigration",
                                            "Boarding Hall",
                                            "Arrival Corridor",
                                            "Luggage Claim",
                                            "Meeters'&Greeters'Area",
                                            "VIP"
                                        ],
                                        "allChecked": true
                                    }
                                ],
                                "allChecked": true
                            },
                            {
                                "name": "T2",
                                "departures": [
                                    {
                                        "name": "DOM",
                                        "areas": [
                                            "Check-in",
                                            "Security Check&Immigration",
                                            "Boarding Hall",
                                            "Arrival Corridor",
                                            "Luggage Claim",
                                            "Meeters'&Greeters'Area",
                                            "VIP"
                                        ],
                                        "allChecked": true
                                    },
                                    {
                                        "name": "INTL",
                                        "areas": [
                                            "Check-in",
                                            "Security Check&Immigration",
                                            "Boarding Hall",
                                            "Arrival Corridor",
                                            "Luggage Claim",
                                            "Meeters'&Greeters'Area",
                                            "VIP"
                                        ],
                                        "allChecked": true
                                    }
                                ],
                                "allChecked": true
                            },
                            {
                                "name": "TC",
                                "departures": [],
                                "allChecked": true
                            },
                            {
                                "name": "Parking",
                                "departures": [],
                                "allChecked": true
                            }
                        ],
                        "languageMaterials": [
                            {
                                "language": "CN",
                                "mobile": PicAddress,
                                "pc": PicAddress,
                                "tablet": PicAddress
                            },
                            {
                                "language": "EN",
                                "mobile": PicAddress,
                                "pc": PicAddress,
                                "tablet": PicAddress
                            }
                        ],
                        "allChecked": true
                    },
                    {
                        "name": "PD",
                        "start": startTimePD,
                        "end": endTimePD,
                        "targetingPV": PD_targetPV,
                        "terminals": [
                            {
                                "name": "T1",
                                "departures": [
                                    {
                                        "name": "DOM",
                                        "areas": [
                                            "Check-in",
                                            "Security Check&Immigration",
                                            "Boarding Hall",
                                            "Arrival Corridor",
                                            "Luggage Claim",
                                            "Meeters'&Greeters'Area",
                                            "VIP"
                                        ],
                                        "allChecked": true
                                    },
                                    {
                                        "name": "INTL",
                                        "areas": [
                                            "Check-in",
                                            "Security Check&Immigration",
                                            "Boarding Hall",
                                            "Arrival Corridor",
                                            "Luggage Claim",
                                            "Meeters'&Greeters'Area",
                                            "VIP"
                                        ],
                                        "allChecked": true
                                    }
                                ],
                                "allChecked": true
                            },
                            {
                                "name": "T2",
                                "departures": [
                                    {
                                        "name": "DOM",
                                        "areas": [
                                            "Check-in",
                                            "Security Check&Immigration",
                                            "Boarding Hall",
                                            "Arrival Corridor",
                                            "Luggage Claim",
                                            "Meeters'&Greeters'Area",
                                            "VIP"
                                        ],
                                        "allChecked": true
                                    },
                                    {
                                        "name": "INTL",
                                        "areas": [
                                            "Check-in",
                                            "Security Check&Immigration",
                                            "Boarding Hall",
                                            "Arrival Corridor",
                                            "Luggage Claim",
                                            "Meeters'&Greeters'Area",
                                            "VIP"
                                        ],
                                        "allChecked": true
                                    }
                                ],
                                "allChecked": true
                            },
                            {
                                "name": "TC",
                                "departures": [],
                                "allChecked": true
                            },
                            {
                                "name": "Parking",
                                "departures": [],
                                "allChecked": true
                            }
                        ],
                        "languageMaterials": [
                            {
                                "language": "CN",
                                "mobile": PicAddress,
                                "pc": PicAddress,
                                "tablet": PicAddress
                            },
                            {
                                "language": "EN",
                                "mobile": PicAddress,
                                "pc": PicAddress,
                                "tablet": PicAddress
                            }
                        ],
                        "allChecked": true
                    }
                ],
                "postPageLink": "",
                "isDefaultPagePlus": false,
                "scheduleId": scheduleId
            }
            request.post('/campaign')
                .set('Authorization', token)
                .set('Content-Type', jsonType)
                .send(campaignRequestBody)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.scheduleId).to.equal(scheduleId);
                    expect(res.body.client).to.equal(client);
                    expect(res.body.brand).to.equal(brand);
                }).end(function (err) {
                if(err){
                    return done(err);
                }done();
            })
        });

        it('When I agree the Campaign',function (done) {
            this.timeout(10000);
            request.post('/campaign' + '/' + campaignId + '/approve')
                .set('Authorization', token)
                .set('Content-Type', jsonType)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.status).to.equal('APPROVED');
                    expect(res.body.scheduleId).to.equal(scheduleId);
                }).end(done)
        });

        it('And I Launch the Campaign',function (done) {
            this.timeout(10000);
            request.post('/campaign' + '/' + campaignId + '/launch')
                .set('Authorization', token)
                .set('Content-Type', jsonType)
                .expect(200)
                .expect(function (res) {
                    expect(res.body.status).to.equal('LAUNCHED');
                    expect(res.body.scheduleId).to.equal(scheduleId);
                }).end(done)
        });
    });




});
