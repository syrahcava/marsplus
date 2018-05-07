const _ = require("lodash")
const Path = require("path-parser")
const {URL} = require("url")
const mongoose = require("mongoose")
// const requireLogin = require("../middlewares/requireLogin")
// const requireCredits = require("../middlewares/requireCredits")
//
// const Survey = mongoose.model("surveys")

module.exports = app => {
  // app.get("/api/surveys", requireLogin, async (req, res) => {
  //   const surveys = await Survey.find({ _user: req.user.id })
  //     .select({recipients: false})
  //
  //   res.send(surveys)
  // })
  //
  // app.get("/api/surveys/:surveyId/:choice", (req, res) => {
  //   res.send("Thanks for voting!")
  // })
  app.get("/api/operation/overview", (req, res) => {
    const salesVolume = [
      {
        x: '2017-05',
        y: 7274002,
      },
      {
        x: '2017-06',
        y: 8725268,
      },
      {
        x: '2017-07',
        y: 12602935,
      },
      {
        x: '2017-08',
        y: 8809837,
      },
      {
        x: '2017-09',
        y: 7628847,
      },
      {
        x: '2017-10',
        y: 8174859,
      },
      {
        x: '2017-11',
        y: 11760260,
      },
      {
        x: '2017-12',
        y: 7005034,
      },
      {
        x: '2018-01',
        y: 7775179,
      },
      {
        x: '2018-02',
        y: 3681867,
      },
      {
        x: '2018-03',
        y: 6642464,
      },
      {
        x: '2018-04',
        y: 7332692,
      },
      {
        x: '2018-05',
        y: 312207,
      },
    ];
    // 家用电器-大家电-品类占比
    const classRatio = [
      {
        x: '大家电配件',
        y: 48.48,
      },
      {
        x: '空调',
        y: 12.21,
      },
      {
        x: '洗衣机',
        y: 9.48,
      },
      {
        x: '厨房大电',
        y: 7.79,
      },
      {
        x: '热水器',
        y: 7.47,
      },
      {
        x: '冰箱',
        y: 7.4,
      },
      {
        x: '平板电视',
        y: 5.82,
      },
      {
        x: '冷柜',
        y: 1.23,
      },
      {
        x: '其他',
        y: 0.12,
      },
    ];

    const channelRatio = [
      {
        x: '天猫',
        y: 58,
      },
      {
        x: '京东',
        y: 42,
      },
    ];

    res.send({
      salesVolume,
      classRatio,
      channelRatio,
    })
  })
}
