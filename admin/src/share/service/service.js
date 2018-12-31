import * as R from 'ramda'

const filterUser = R.filter(R.compose(R.equals('U'), R.prop('obj_type')))
const filterDept = R.filter(R.compose(R.equals('D'), R.prop('obj_type')))

const formatIncomingUserData = R.map(user => ({
  login_name: user.obj_id,
  user_id: user.user_id,
  name: user.obj_name,
  avatar_url: setImageUrl(user.obj_icon),
  dept_id: Number(user.dept_id) || '',
  type: 'user'
}))

const getUsers = R.transduce(
  R.compose(filterUser, formatIncomingUserData),
  R.flip(R.append),
  []
)

const formatIncomingDeptData = R.map(dept => ({
  id: Number(dept.obj_id),
  name: dept.obj_name,
  avatar_url: '',
  dept_id: '',
  type: 'dept'
}))

const getDepts = R.transduce(
  R.compose(filterDept, formatIncomingDeptData),
  R.flip(R.append),
  []
)

const changeKey = function (data) {
  return data.map(item => {
    return item.type === 'user'
      ? {
        id: item.login_name,
        icon: item.avatar_url,
        name: item.name,
        dept_id: item.dept_id,
        objType: 'U'
      }
      : {
        id: item.id,
        icon: '',
        name: item.name,
        dept_id: '',
        objType: 'D'
      }
  })
}

const changeSendKey = function (data) {
  return data.map(item => {
    return item.type === 'user'
      ? {
        id: item.login_name,
        user_id: item.id,
        icon: item.avatar_url,
        name: item.name,
        dept_id: item.dept_id,
        objType: 'U'
      }
      : {
        id: item.id,
        user_id: '',
        icon: '',
        name: item.name,
        dept_id: '',
        objType: 'D'
      }
  })
}

function changeTypeValue (param) {
  return param == 'U' ? 'user' : 'dept'
}

function setImageUrl (param) {
  if (param.indexOf('http') > -1) {
    return param
  } else {
    param = param.replace(/\/\//, '/')
    return location.protocol + '//' + location.host + param
  }
}

// const getUsers = function (data) {
//     return data.filter(item => {
//         return item.type == 'user'
//     })
// }

// const getDepts = function (data) {
//     return data.filter(item => {
//         return item.type == 'dept'
//     })
// }

export default {
  changeKey,
  getUsers,
  getDepts,
  changeSendKey
}
