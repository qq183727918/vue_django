const data = [
  {
    content:
      '开源版品牌名升级为vue-admin-beautiful-pro，付费版vue2.x品牌升级为Admin Pro，付费版vue3.x品牌名升级为Admin Plus',
    timestamp: '最近更新',
  },
]

module.exports = [
  {
    url: '/changeLog/getList',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        totalCount: 999,
        data: data,
      }
    },
  },
]
