const data = [
  {
    title: '',
    closable: false,
    type: 'success',
  },
  {
    closable: false,
    type: 'warning',
  },
  {
    title: '',
    type: 'success',
  },
]
module.exports = [
  {
    url: '/notice/getList',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data,
      }
    },
  },
]
