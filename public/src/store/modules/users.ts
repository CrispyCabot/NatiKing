import api from "@/api/api";
import { TOAST_TYPES } from "@/utils/toastTypes";

export const UserActions = {
  fetchUsers({ getters }: any) {
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/users` : `/users`;
    return new Promise((resolve, reject) => {
      api
        .get(route)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchUserById({ getters }: any, id: String) {
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/users/${id}` : `/users/${id}`;
    return new Promise((resolve, reject) => {
      api
        .get(route)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchWriters({ getters }: any) {
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/writers` : `/writers`;
    return new Promise((resolve, reject) => {
      api
        .get(route)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createNewUser({ getters }: any, payload: any) {
    const { email, password, name } = payload;
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/users/create` : `/users/create`;
    return new Promise((resolve, reject) => {
      api
        .post(route, { email, password, name })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logUserIn({ commit, getters }: any, payload: any) {
    const { email, password } = payload;
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/users/login` : `/users/login`;
    return new Promise((resolve, reject) => {
      api
        .post(route, { email, password })
        .then(({ data }) => {
          if (data.status == 200) {
            commit("updateIsLoggedIn", true);
            commit("updateLoggedInUser", data.user);
            commit("updateAccessToken", data.accessToken);
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logUserOut({ commit, getters }: any) {
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/users/logout` : `/users/logout`;
    return new Promise((resolve, reject) => {
      api
        .post(route)
        .then(({ data }) => {
          if (data.status == 200) {
            commit("updateIsLoggedIn", false);
            commit("updateLoggedInUser", {});
            commit("updateAccessToken", null);
            commit("updateGlobalToast", {
              message: data.message,
              type:
                data.status == 400 ? TOAST_TYPES.Error : TOAST_TYPES.Success,
              duration: 5000,
              isShowing: true,
            });
            resolve(data);
          } else {
            throw "Invalid logout";
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateUserSettings({ commit, getters }: any, payload: any) {
    const { userId, updates } = payload;
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData
      ? `/mock/users/update-profile`
      : `/users/update-profile`;
    return new Promise((resolve, reject) => {
      api
        .put(route, { userId, updates })
        .then(({ data }) => {
          if (data.status == 200) {
            commit("updateLoggedInUser", data.user);
            resolve(data);
          } else {
            throw "Invalid logout";
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  deleteSocial({ commit, getters }: any, payload: any) {
    const { userId, socialURL } = payload;
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData
      ? `/mock/users/delete-social`
      : `/users/delete-social`;
    return new Promise((resolve, reject) => {
      api
        .put(route, { userId, socialURL })
        .then(({ data }) => {
          if (data.status == 200) {
            commit("updateLoggedInUser", data.user);
            resolve(data);
          } else {
            throw "Invalid logout";
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
