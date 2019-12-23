import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('tasks', {
      params: bookmark
    })
  },
  post (bookmark) {
    return Api().post('tasks', bookmark)
  },
  delete (id) {
    return Api().delete(`tasks/${id}`)
  }
}
