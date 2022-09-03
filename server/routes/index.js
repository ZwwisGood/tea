var express = require('express');
var router = express.Router();
var connection = require('../db/sql')
var user = require('../db/userSql')
var QcloudSms = require("qcloudsms_js");
let jwt = require('jsonwebtoken')
//引入支付宝配置文件
const alipaySdk = require('../db/alipay')
const AlipayFormData = require('alipay-sdk/lib/form').default
//引入axios
const axios = require('axios')

function isTokenExpired(exp) {
  let time = parseInt(Date.now() / 1000)
  if (time > exp) {
    return true
  }
}

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//首页推荐的数据
router.get('/api/index_list/0/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      topBar: [
        { id: 0, label: '推荐' },
        { id: 1, label: '大红袍' },
        { id: 2, label: '铁观音' },
        { id: 3, label: '绿茶' },
        { id: 4, label: '普洱' },
        { id: 5, label: '茶具' },
        { id: 6, label: '花茶' },
      ],
      data: [
        //这是swiper
        {
          id: 0,
          type: 'swiperList',
          data: [
            { id: 0, imgUrl: '/images/swiper1.jpeg' },
            { id: 1, imgUrl: '/images/swiper2.jpeg' },
            { id: 2, imgUrl: '/images/swiper3.jpeg' }
          ]
        },
        //这是icons
        {
          id: 1,
          type: 'iconsList',
          data: [
            {
              id: 1, title: '自饮茶', imgUrl: '/images/icons1.png'
            },
            {
              id: 2, title: '茶具', imgUrl: '/images/icons2.png'
            },
            {
              id: 3, title: '茶礼盒', imgUrl: '/images/icons3.png'
            },
            {
              id: 4, title: '领福利', imgUrl: '/images/icons4.png'
            },
            {
              id: 5, title: '官方验证', imgUrl: '/images/icons5.png'
            },
          ]
        },
        //这是爆款推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 1,
              name: '龙井1号铁罐250g',
              content: '鲜爽甘醇 口粮首选',
              price: '68',
              imgUrl: '/images/recommend.jpeg',
            },
            {
              id: 2,
              name: '龙井1号铁罐250g',
              content: '鲜爽甘醇 口粮首选',
              price: '68',
              imgUrl: '/images/recommend.jpeg',
            },
          ]
        },
        //这是猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 1,
              imgUrl: '/images/goods1.jpg',
              name: '赛事茶-第三届武夷山茶叶交易会暨仙店杯-优质奖肉桂160g',
              price: 228
            },
            {
              id: 2,
              imgUrl: '/images/goods2.jpg',
              name: '茶具-中式陶瓷茶叶中式陶瓷茶叶中式陶瓷茶叶',
              price: 23
            },
            {
              id: 3,
              imgUrl: '/images/goods2.jpg',
              name: '中式陶瓷茶具',
              price: 22
            },
            {
              id: 4,
              imgUrl: '/images/goods4.jpg',
              name: '明前春茶 绿茶 龙井破春系列80g罐装',
              price: 98
            },
            {
              id: 5,
              imgUrl: '/images/goods2.jpg',
              name: '茶具 好茶',
              price: 18
            },
            {
              id: 6,
              imgUrl: '/images/goods2.jpg',
              name: '茶具-中式陶瓷茶叶中式陶瓷茶叶中式',
              price: 26
            },
            {
              id: 7,
              imgUrl: '/images/like3.jpeg',
              name: '茶具-中式陶瓷茶叶中式陶瓷',
              price: 26
            },
            {
              id: 8,
              imgUrl: '/images/like2.jpeg',
              name: '绿茶 远致龙井3号 150g 清爽甘醇',
              price: 108
            },
            {
              id: 9,
              imgUrl: '/images/like2.jpeg',
              name: '绿茶 远致龙井 150g ',
              price: 118
            },
          ]
        }
      ]
    }

  });
});

//大红袍的数据
router.get('/api/index_list/1/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 1,
        type: 'adList',
        data: [
          {
            id: 1,
            imgUrl: './images/dhp.jpeg'
          },
          {
            id: 2,
            imgUrl: './images/dhp.jpeg'
          },
        ]
      },
      {
        id: 2,
        type: 'likeList',
        data: [
          {
            id: 1,
            imgUrl: './images/like.jpeg',
            name: '建盏茶具套装 红色芝麻毫 12件套',
            price: 299
          },
          {
            id: 2,
            imgUrl: './images/like.jpeg',
            name: '建盏茶具套装 红色芝麻毫 12件套',
            price: 299
          },
          {
            id: 3,
            imgUrl: './images/like.jpeg',
            name: '建盏茶具套装 红色芝麻毫 12件套',
            price: 299
          },
          {
            id: 4,
            imgUrl: './images/like.jpeg',
            name: '建盏茶具套装 红色芝麻毫 12件套',
            price: 299
          }
        ]
      }
    ]
  })
})

//铁观音的数据
router.get('/api/index_list/2/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 1,
        type: 'adList',
        data: [
          {
            id: 1,
            imgUrl: '/images/tgy.jpeg'
          },
          {
            id: 2,
            imgUrl: '/images/tgy.jpeg'
          },
        ]
      },
      {
        id: 1,
        type: 'iconsList',
        data: [
          {
            id: 1, title: '自饮茶', imgUrl: '/images/icons1.png'
          },
          {
            id: 2, title: '茶具', imgUrl: '/images/icons2.png'
          },
          {
            id: 3, title: '茶礼盒', imgUrl: '/images/icons3.png'
          },
          {
            id: 4, title: '领福利', imgUrl: '/images/icons4.png'
          },
          {
            id: 5, title: '官方验证', imgUrl: '/images/icons5.png'
          },
        ]
      },
      {
        id: 2,
        type: 'likeList',
        data: [
          {
            id: 1,
            imgUrl: '/images/like.jpeg',
            name: '建盏茶具套装 红色芝麻毫 12件套',
            price: 299
          },
          {
            id: 2,
            imgUrl: '/images/like.jpeg',
            name: '建盏茶具套装 红色芝麻毫 12件套',
            price: 299
          },
          {
            id: 3,
            imgUrl: '/images/like.jpeg',
            name: '建盏茶具套装 红色芝麻毫 12件套',
            price: 299
          },
          {
            id: 4,
            imgUrl: '/images/like.jpeg',
            name: '建盏茶具套装 红色芝麻毫 12件套',
            price: 299
          }
        ]
      },
    ]
  })
})

//查询商品数据接口
router.get('/api/goods/shopList', function (req, res, next) {
  //前端给后端的关键字、升降序(searchName、price)
  let [searchName, orderName] = Object.keys(req.query)
  //（name是关键字如：茶叶，order是asc或desc）
  let [name, order] = Object.values(req.query)
  console.log(searchName);
  connection.query('select * from goods_list where name like "%' + name + '%" order by ' + orderName + ' ' + order + '', function (err, results) {
    res.send({
      code: 0,
      data: results
    })
  })
})

//分类页面的数据接口
router.get('/api/goods/list', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        //一级数据（左侧选项）
        id: 0,
        name: '推荐',
        data: [
          {
            //二级数据（右侧大分类）
            id: 0,
            name: '推荐',
            list: [
              //三级数据（右侧大分类的小项）
              {
                id: 0,
                name: '紫砂壶',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 1,
                name: '铁观音',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 2,
                name: '金骏眉',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 3,
                name: '武夷岩茶',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 4,
                name: '龙井',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 5,
                name: '云南滇红',
                imgUrl: '/images/list1.jpeg'
              },
            ]
          }
        ]
      },
      {
        //一级数据（左侧选项）
        id: 1,
        name: '绿茶',
        data: [
          {
            //二级数据（右侧大分类）
            id: 0,
            name: '绿茶',
            list: [
              //三级数据（右侧大分类的小项）
              {
                id: 0,
                name: '龙井',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 1,
                name: '黄山毛峰',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 2,
                name: '碧螺春',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 3,
                name: '雀舌',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 4,
                name: '太平猴魁',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 5,
                name: '安吉白',
                imgUrl: '/images/list1.jpeg'
              },
            ]
          }
        ]
      },
      {
        //一级数据（左侧选项）
        id: 2,
        name: '乌龙',
        data: [
          {
            //二级数据（右侧大分类）
            id: 0,
            name: '乌龙',
            list: [
              //三级数据（右侧大分类的小项）
              {
                id: 0,
                name: '龙井',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 1,
                name: '黄山毛峰',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 2,
                name: '碧螺春',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 3,
                name: '雀舌',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 4,
                name: '太平猴魁',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 5,
                name: '安吉白',
                imgUrl: '/images/list1.jpeg'
              },
            ]
          }
        ]
      },
      {
        //一级数据（左侧选项）
        id: 3,
        name: '红茶',
        data: [
          {
            //二级数据（右侧大分类）
            id: 0,
            name: '红茶',
            list: [
              //三级数据（右侧大分类的小项）
              {
                id: 0,
                name: '龙井',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 1,
                name: '黄山毛峰',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 2,
                name: '碧螺春',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 3,
                name: '雀舌',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 4,
                name: '太平猴魁',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 5,
                name: '安吉白',
                imgUrl: '/images/list1.jpeg'
              },
            ]
          }
        ]
      },
      {
        //一级数据（左侧选项）
        id: 4,
        name: '白茶',
        data: [
          {
            //二级数据（右侧大分类）
            id: 0,
            name: '白茶',
            list: [
              //三级数据（右侧大分类的小项）
              {
                id: 0,
                name: '龙井',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 1,
                name: '黄山毛峰',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 2,
                name: '碧螺春',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 3,
                name: '雀舌',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 4,
                name: '太平猴魁',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 5,
                name: '安吉白',
                imgUrl: '/images/list1.jpeg'
              },
            ]
          }
        ]
      },
      {
        //一级数据（左侧选项）
        id: 5,
        name: '普洱',
        data: [
          {
            //二级数据（右侧大分类）
            id: 0,
            name: '普洱',
            list: [
              //三级数据（右侧大分类的小项）
              {
                id: 0,
                name: '龙井',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 1,
                name: '黄山毛峰',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 2,
                name: '碧螺春',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 3,
                name: '雀舌',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 4,
                name: '太平猴魁',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 5,
                name: '安吉白',
                imgUrl: '/images/list1.jpeg'
              },
            ]
          }
        ]
      },
      {
        //一级数据（左侧选项）
        id: 6,
        name: '花茶',
        data: [
          {
            //二级数据（右侧大分类）
            id: 0,
            name: '花茶',
            list: [
              //三级数据（右侧大分类的小项）
              {
                id: 0,
                name: '龙井',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 1,
                name: '黄山毛峰',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 2,
                name: '碧螺春',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 3,
                name: '雀舌',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 4,
                name: '太平猴魁',
                imgUrl: '/images/list1.jpeg'
              },
              {
                id: 5,
                name: '安吉白',
                imgUrl: '/images/list1.jpeg'
              },
            ]
          }
        ]
      },
    ]
  })
})

//根据商品id获取商品信息的接口
router.get('/api/goods/id', function (req, res, next) {
  let id = req.query.id
  connection.query(`select * from goods_list where id = ${id}`, function (error, result) {
    if (error) throw error
    res.json({
      code: 0,
      data: result[0]
    })
  })
})

//密码登录接口
router.post('/api/login', function (req, res, next) {
  //后端接收前端传来的数据
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd
  }
  //每次登录新生成一个token
  let userTel = params.userTel
  let userPwd = params.userPwd || '666666'
  //引入token包
  let jwt = require('jsonwebtoken')
  //用户信息
  let payload = { tel: userTel }
  //口令
  let secret = 'zww'
  //生成token
  let token = jwt.sign(payload, secret, {
    expiresIn: 60
  })
  console.log('生成的token:', jwt.decode(token), token);

  //查询用户手机号是否存在
  connection.query(user.queryUserTel(params), function (error, results) {
    //手机号存在
    if (results.length > 0) {
      //记录的id
      let id = results[0].id
      //把新生成一个token替换旧的token（${token}要加双引号，不能单引号）
      connection.query(`update user set token = "${token}" where id = ${id}`, function (e, r) {
        console.log('更换token');
      })
      connection.query(user.queryUserPwd(params), function (err, result) {
        if (result.length > 0) {

          //手机号密码都正确
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: result[0]
            }
          })
        } else {
          //密码不对
          res.send({
            code: 302,
            data: {
              success: false,
              msg: '密码不正确'
            }
          })
        }
      })
    } else {
      //不存在
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '手机号不存在'
        }
      })
    }
  })
})

//发送短信验证码
router.post('/api/code', function (req, res, next) {
  let tel = req.body.phone

  // 短信应用SDK AppID
  var appid = 1400187558;  // SDK AppID是1400开头

  // 短信应用SDK AppKey
  var appkey = "dc9dc3391896235ddc2325685047edc7";

  // 需要发送短信的手机号码
  var phoneNumbers = [tel];

  // 短信模板ID，需要在短信应用中申请
  var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

  // 签名
  var smsSign = "三人行慕课";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

  // 实例化QcloudSms
  var qcloudsms = QcloudSms(appid, appkey);

  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
  function callback(err, ress, resData) {
    if (err) {
      console.log("err: ", err);
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }

  var ssender = qcloudsms.SmsSingleSender();
  //这个变量：params 就是往手机上，发送的短信
  var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
  ssender.sendWithParam(86, phoneNumbers[0], templateId,
    params, smsSign, "", "", callback);  // 签名参数不能为空串
})

//增加一个用户
router.post('/api/addUser', function (req, res, next) {
  let params = {
    userTel: req.body.phone,
  }
  //查询用户是否存在
  connection.query(user.queryUserTel(params), function (error, results) {
    if (error) throw error
    //用户存在
    if (results.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: '登录成功',
          data: results[0]
        }
      })
    } else {
      //不存在，新增一条
      connection.query(user.insertData(params), function (err, result) {
        connection.query(user.queryUserTel(params), function (e, r) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: r[0]
            }
          })
        })
      })
    }
  })
})

//注册
router.post('/api/register', function (req, res, next) {
  let params = {
    userTel: req.body.phone,
    userPwd: req.body.userPwd
  }
  //查询用户是否存在
  connection.query(user.queryUserTel(params), function (error, results) {
    //用户存在
    if (results.length > 0) {
      console.log(params);

      res.send({
        code: 400,
        data: {
          success: false,
          msg: '账号已存在,请直接登录',
        }
      })
    } else {
      //不存在，新增一条
      connection.query(user.insertData(params), function (err, result) {
        if (err) throw err
        connection.query(user.queryUserTel(params), function (e, r) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '注册成功',
              data: r[0]
            }
          })
        })
      })
    }
  })
})

//查询用户是否存在
router.post('/api/selectUser', function (req, res, next) {
  let params = {
    userTel: req.body.phone,
  }
  connection.query(user.queryUserTel(params), function (error, results) {
    if (error) throw error
    //用户存在
    if (results.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
        }
      })
    } else {
      //不存在
      res.send({
        code: 0,
        data: {
          success: false,
          msg: '该用户未注册'
        }
      })
    }
  })
})

//修改(找回)密码
router.post('/api/recovery', function (req, res, next) {
  //获取用户的手机号和修改的新密码
  let params = {
    //手机号
    userTel: req.body.phone,
    //新密码
    userPwd: req.body.pwd
  }
  //这里更改的密码必须加引号，否则无法解析为字符串
  connection.query(`update user set pwd = '${params.userPwd}' where tel = ${params.userTel}`, function (error, result) {
    if (error) throw error
    res.send({
      code: 200,
      data: {
        success: true,
        msg: '修改成功'
      }
    })
  })
})

//加入购物车
router.post('/api/addCart', function (req, res, next) {
  //后端接收前端的参数
  let goodsId = req.body.goodsId
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //判断token是否过期
  if (isTokenExpired(tokenObj.exp)) {
    console.log('过期');
    res.send({
      data: {
        code: 1000
      }
    })
  } else {
    //根据token查询用户信息
    connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
      //获取用户ID
      let uId = results[0].id
      //查询商品信息
      connection.query(`select * from goods_list where id = ${goodsId}`, function (err, result) {
        //获取商品的名字、价格、图片
        let goodsName = result[0].name
        let goodsPrice = result[0].price
        let goodsImgUrl = result[0].imgUrl
        //查询该用户购物车中是否有该商品
        connection.query(`select * from goods_cart where uId = ${uId} and goods_id = ${goodsId}`, function (e, r) {
          //已有该商品
          if (r.length > 0) {
            //获取商品原来的数量
            let num = r[0].goods_num
            connection.query(`update goods_cart set goods_num = ${~~num + 1} where id = ${r[0].id}`, function (ee, rr) {
              res.send({
                data: {
                  code: 200,
                  success: true,
                  msg: '添加成功'
                }
              })
            })
          } else {
            //没有该商品,将该商品加入到用户的购物车
            connection.query(`insert into goods_cart (uId,goods_id,goods_name,goods_price,goods_num,goods_imgUrl)
            values ("${uId}","${goodsId}","${goodsName}","${goodsPrice}","1","${goodsImgUrl}")`, function (eee, rrr) {
              res.send({
                data: {
                  code: 200,
                  success: true,
                  msg: '添加成功'
                }
              })
            })
          }
        })

      })
    })
  }
})

//查询当前用户的购物车数据
router.post('/api/selectCart', function (req, res, next) {
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //查询用户信息
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    //获取用户id
    let uId = results[0].id
    //查询购物车
    connection.query(`select * from goods_cart where uId = ${uId}`, function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true,
          data: result
        }
      })
    })
  })
})

//删除购物车数据
router.post('/api/deleteCart', function (req, res, next) {
  let arrId = req.body.arrId
  console.log(arrId);
  for (let i = 0; i < arrId.length; i++) {
    connection.query(`delete from goods_cart where id = ${arrId[i]}`, function (error, results) {
      console.log('delete');

    })
  }
  res.send({
    data: {
      code: 200,
      msg: '删除成功',
      success: true,
    }
  })

})

//更改商品数量
router.post('/api/updateNum', function (req, res, next) {
  let { id, num } = req.body
  connection.query(`update goods_cart set goods_num = ${num} where id = ${id}`, function (error, results) {
    res.send({
      data: {
        code: 200,
        success: true,
      }
    })
  })
})

//添加地址
router.post('/api/addAddress', function (req, res, next) {
  //拿到前端传来的数据
  let { name, tel, province, city, county, addressDetail, isDefault, areaCode } = req.body
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //根据token查询用户信息，获取id
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let uId = results[0].id
    //判断添加的地址是否设置为默认地址
    if (isDefault != 1) {
      //不是默认地址，直接添加
      connection.query(`insert into address (uId,name, tel, province, city, county, addressDetail, isDefault, areaCode) 
      values ("${uId}","${name}", "${tel}", "${province}", "${city}", "${county}", "${addressDetail}", "${isDefault}", "${areaCode}")`, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            msg: '添加地址成功'
          }
        })
      })
    } else {
      //是默认地址，则把原来默认地址isDefault设置为0，再添加这个新的默认地址
      connection.query(`update address set isDefault = 0 where uId = ${uId} and isDefault = 1`, function (e, r) {
        connection.query(`insert into address (uId,name, tel, province, city, county, addressDetail, isDefault, areaCode) 
        values ("${uId}","${name}", "${tel}", "${province}", "${city}", "${county}", "${addressDetail}", "${isDefault}", "${areaCode}")`, function (err, result) {
          res.send({
            data: {
              code: 200,
              success: true,
              msg: '添加地址成功'
            }
          })
        })
      })
    }
  })
})

//获取该用户的收货地址
router.get('/api/getAddress', function (req, res, next) {
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //根据token查询用户信息
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, result) {
    //获取用户ID
    let uId = result[0].id
    connection.query(`select * from address where uId = ${uId}`, function (err, results) {
      res.send({
        data: {
          code: 200,
          success: true,
          msg: '查询成功',
          data: results
        }
      })
    })
  })
})

//修改用户的收货地址
router.post('/api/updateAddress', function (req, res, next) {
  //拿到前端传来的数据
  let { name, tel, province, city, county, addressDetail, isDefault, areaCode } = req.body
  //拿到当前地址在数据库中的id
  let addressId = req.body.id
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //根据token查询用户信息，获取id
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let uId = results[0].id
    if (isDefault == 0) {
      //不设置为默认地址，直接修改
      let updateSql = `update address set name=?, tel=?, province=?, city=?, county=?, addressDetail=?, isDefault=?, areaCode=? where id = ${addressId}`
      connection.query(updateSql, [name, tel, province, city, county, addressDetail, isDefault, areaCode], function (e, r) {
        res.send({
          data: {
            code: 200,
            success: true,
            msg: '修改成功'
          }
        })
      })
    } else {
      //设置为默认地址，则清除原来的默认地址
      connection.query(`update address set isDefault = 0 where uId = ${uId} and isDefault = 1`, function (err, result) {
        let updateSql = `update address set name=?, tel=?, province=?, city=?, county=?, addressDetail=?, isDefault=?, areaCode=? where id = ${addressId}`
        connection.query(updateSql, [name, tel, province, city, county, addressDetail, isDefault, areaCode], function (e, r) {
          res.send({
            data: {
              code: 200,
              success: true,
              msg: '修改成功'
            }
          })
        })
      })
    }
  })
})

//删除地址
router.post('/api/deleteAddress', function (req, res, next) {
  let deleteId = req.body.id
  connection.query(`delete from address where id = ${deleteId}`, function (error, result) {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '删除成功'
      }
    })
  })
})

//生成一个订单
router.post('/api/addOrder', function (req, res, next) {
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //前端给后端传的数据（订单里的商品）
  let goodsArr = req.body.arr
  //生成订单号order_id，规则：时间戳+5-6位随机数
  function randomNumber() {
    const date = new Date()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return date.getFullYear().toString() + month.toString() + day + hour + minute + second + Math.ceil(Math.random() * 10000).toString()
  }
  //订单状态：未支付1，待支付2，支付成功3，支付失败4||0
  //商品列表名称
  let goodsName = []
  //订单商品总金额
  let goodsPrice = 0
  //订单商品总数量
  let goodsNum = 0
  //订单号
  let orderId = randomNumber()

  goodsArr.forEach(item => {
    goodsName.push(item.goods_name)
    goodsPrice += item.goods_price * item.goods_num
    goodsNum += ~~item.goods_num
  })
  //根据token查询用户信息，获取id
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let uId = results[0].id
    //订单表新增数据
    connection.query(`insert into store_order (order_Id,uId,goods_name,goods_price,goods_num,order_status)
    values(${orderId},${uId},"${goodsName}","${goodsPrice}","${goodsNum}",'1')`, function (e, r) {
      connection.query(`select * from store_order where uId = ${uId} and order_id = '${orderId}'`, function (err, result) {
        res.send({
          data: {
            success: true,
            code: 200,
            data: result
          }
        })
      })
    })
  })
})

//查询订单
router.post('/api/selectOrder', function (req, res, next) {
  //接收要查询的订单号
  let order_Id = req.body.order_Id
  connection.query(`select * from store_order where order_Id = ${order_Id}`, function (error, results) {
    res.send({
      data: {
        success: true,
        code: 200,
        data: results
      }
    })
  })
})

//提交订单，修改订单状态
router.post('/api/submitOrder', function (req, res, next) {
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //提交的订单号
  let orderId = req.body.order_Id
  //提交的商品id数组
  let shopArr = req.body.shopArr
  console.log(orderId);
  console.log(shopArr);
  //根据token查询用户信息，获取id
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let uId = results[0].id
    connection.query(`update store_order set order_status = 2 where order_Id = ${orderId} and uId = ${uId}`, function (err, result) {
      shopArr.forEach(item => {
        connection.query(`delete from goods_cart where id = ${item}`, function (e, r) {
        })
      })
      res.send({
        data: {
          code: 200,
          success: true,
        }
      })
    })
  })
})

//发起支付
router.post('/api/payment', function (req, res, next) {
  //订单号
  let orderId = req.body.orderId
  //商品总价
  let price = req.body.price
  //购买商品的名称
  let name = req.body.name

  //开始对接支付宝API
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get')
  //支付时信息
  formData.addField('bizContent', {
    outTradeNo: orderId, //订单号
    productCode: 'FAST_INSTANT_TRADE_PAY',  //写死
    totalAmount: price,  //总价
    subject: name,  //商品名称
  })
  //支付成功或失败跳转的链接
  formData.addField('returnUrl', 'http://localhost:8080/payment');
  //返回一个promise
  const result = alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData },
  );
  //对接支付宝成功，支付宝方返回的数据
  result.then(resp => {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '支付中',
        paymentUrl: resp
      }
    })
  })
})

//支付状态
router.post('/api/paySuccess', function (req, res, next) {
  //token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //订单号
  let our_trade_no = req.body.out_trade_no
  let trade_no = req.body.trade_no
  //支付宝配置
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get')
  //支付时信息
  formData.addField('bizContent', {
    our_trade_no,
    trade_no
  })
  //返回一个promise
  const result = alipaySdk.exec(
    'alipay.trade.query',
    {},
    { formData: formData },
  );
  //后端请求支付宝
  result.then(resData => {
    axios({
      method: 'GET',
      url: resData
    }).then(data => {
      let responseCode = data.data.alipay_trade_query_response
      if (responseCode.code == '10000') {
        switch (responseCode.trade_status) {
          case 'WAIT_BUYER_PAY':
            res.send({
              data: {
                code: 0,
                msg: '支付宝有交易记录，没付款'
              }
            })
            break
          case 'TRADE_CLOSED':
            res.send({
              data: {
                code: 1,
                msg: '交易关闭'
              }
            })
            break
          case 'TRADE_FINISHED':
            //根据token查询用户信息，获取id
            connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
              let uId = results[0].id
              connection.query(`select * from store_order where uId = ${uId} and order_id = ${our_trade_no}`, function (err, result) {
                //获取订单的id
                let id = result[0].id
                //修改订单状态
                connection.query(`update store_order set order_status = ${3} where id = ${id}`, function (e, r) {

                })
              })
            })
            res.send({
              data: {
                code: 2,
                msg: '交易完成'
              }
            })
            break
          case 'TRADE_SUCCESS':
            //根据token查询用户信息，获取id
            connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
              let uId = results[0].id
              connection.query(`select * from store_order where uId = ${uId} and order_id = ${our_trade_no}`, function (err, result) {
                //获取订单的id
                let id = result[0].id
                //修改订单状态
                connection.query(`update store_order set order_status = ${3} where id = ${id}`, function (e, r) {

                })
              })
            })
            res.send({
              data: {
                code: 2,
                msg: '交易完成'
              }
            })
            break
        }
      } else if (responseCode.code == '40004') {
        res.send({
          data: {
            code: 4,
            msg: '交易不存在'
          }
        })
      }
    }).catch(err => {
      res.send({
        data: {
          code: 500,
          msg: '交易失败',
          err
        }
      })
    })
  })
})

module.exports = router;
