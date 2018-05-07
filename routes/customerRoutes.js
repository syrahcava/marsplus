const _ = require("lodash")
const Path = require("path-parser")
const {URL} = require("url")
const mongoose = require("mongoose")
// const requireLogin = require("../middlewares/requireLogin")
// const requireCredits = require("../middlewares/requireCredits")
//
// const Survey = mongoose.model("surveys")

module.exports = app => {
  app.get("/api/customer/overview", (req, res) => {
    const ageRatio = [
      {
        x: '18~24岁',
        y: 19.42,
      },
      {
        x: '25~29岁',
        y: 33.57,
      },
      {
        x: '30~34岁',
        y: 19.06,
      },
      {
        x: '35~39岁',
        y: 12.34,
      },
      {
        x: '大于40岁',
        y: 9.51,
      },
    ];
    const genderRatio = [
      {
        x: '男性',
        y: 50.73,
      },
      {
        x: '女性',
        y: 49.27,
      },
    ];

    const tagRatio = [
      {
        x: '宅男宅女',
        y: 20.24,
      },
      {
        x: '家庭主妇',
        y: 17.67,
      },
      {
        x: '数码一族',
        y: 21.86,
      },
      {
        x: '时尚女性',
        y: 12.31,
      },
      {
        x: '运动一族',
        y: 17.59,
      },
      {
        x: '精英人群',
        y: 10.33,
      },
    ];

    const areaRatio = [
      { name: '北京', value: 26.2 },
      { name: '山东', value: 13.2 },
      { name: '上海', value: 16.1 },
      { name: '广东', value: 22.3 },
      { name: '湖北', value: 16.2 },
      { name: '湖南', value: 14.8 },
      { name: '陕西', value: 6.2 },
    ];

    res.send({
      ageRatio,
      genderRatio,
      tagRatio,
      areaRatio,
    })
  })


  app.get("/api/customer/list", (req, res) => {
    const customerArray = [
      {
        username: 'Panda',
        gender: '男',
        area: '北京 海淀',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '大龙',
        gender: '男',
        area: '北京 朝阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'wqs9122',
        gender: '女',
        area: '河北 秦皇岛',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '伊阳',
        gender: '女',
        area: '北京 海淀',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '破宇',
        gender: '男',
        area: '北京 朝阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '翟镆',
        gender: '男',
        area: '北京 海淀',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'Pandora',
        gender: '男',
        area: '北京 朝阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '飞',
        gender: '男',
        area: '广东 广州',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '我不当仙女已经很久了',
        gender: '女',
        area: '北京 朝阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '梧桐',
        gender: '男',
        area: '北京 海淀',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '不苟且',
        gender: '男',
        area: '北京',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'HankWong',
        gender: '男',
        area: '北京 海淀',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'HankWong',
        gender: '男',
        area: '北京 海淀',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'stenio',
        gender: '男',
        area: '北京',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'Jesus',
        gender: '男',
        area: '河北 邯郸',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '妳賞濨的湮瘾',
        gender: '男',
        area: '黑龙江 哈尔滨',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '许跃',
        gender: '男',
        area: '北京 通州',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '松柏',
        gender: '男',
        area: '北京 海淀',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '木子美眉',
        gender: '女',
        area: '湖南 衡阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'Believe',
        gender: '女',
        area: '湖北 武汉',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '小蜡笔',
        gender: '女',
        area: '华盛顿 西雅图',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'Stefan[[%F0%9F%98%92]]',
        gender: '男',
        area: '北京',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'Dean',
        gender: '男',
        area: '北京',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '[[%F0%9F%91%91]]哥斯拉 ^ω^',
        gender: '男',
        area: '北京 昌平',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'slashrose',
        gender: '男',
        area: '山东 潍坊',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '败星，，',
        gender: '男',
        area: '湖南 岳阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '✘……♚灰灰',
        gender: '男',
        area: '广东 东莞',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'ScvQ',
        gender: '男',
        area: '山东 青岛',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '阿宝堂食品店',
        gender: '男',
        area: '安徽 毫州',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'wqs9122',
        gender: '女',
        area: '河北 秦皇岛',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '杨磊SheUp [[%F0%9F%A4%93]]',
        gender: '女',
        area: '四川 成都',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '小敏兒[[%F0%9F%98%8A]]',
        gender: '女',
        area: '上海',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '刘馨',
        gender: '女',
        area: '山东 济南',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '豆子其实也叫Ann',
        gender: '女',
        area: '浙江 杭州',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '小白',
        gender: '男',
        area: '都灵',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '尤尤西子',
        gender: '女',
        area: '北京 海淀',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '曹文瑞',
        gender: '男',
        area: '广东 深圳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '张龙',
        gender: '男',
        area: '北京 朝阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '灵析-郭润苗',
        gender: '男',
        area: '北京 朝阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '王俊超',
        gender: '男',
        area: '江苏 苏州',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '白小薇',
        gender: '女',
        area: '北京 朝阳',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '葱',
        gender: '女',
        area: '广东 广州',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '西西废',
        gender: '女',
        area: '上海 徐汇',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: '任婷',
        gender: '女',
        area: '陕西 西安',
        tel: '',
        email: '',
        channel: '京东',
      },
      {
        username: 'Mr.Chu',
        gender: '男',
        area: '上海 闵行',
        tel: '',
        email: '',
        channel: '京东',
      },
    ];

    res.send({
      customerArray
    })
  })
}
