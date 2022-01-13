import api from '@/api/api'

export const UserActions = {
  fetchUsers({ getters }: any) {
    const isUsingMockData = getters.getIsUsingMockData
    const route = isUsingMockData ? `/mock/users` : `/users`
    return new Promise((resolve, reject) => {
      api.get(route)
        .then(({data}) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}