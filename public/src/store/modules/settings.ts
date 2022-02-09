import api from "@/api/api";

export const SettingsActions = {
  fetchColors({ getters }: any) {
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/colors` : `/colors`;
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
  updateColors({ commit, getters }: any, payload: any) {
    const { newColors } = payload;
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/colors` : `/colors`;
    return new Promise((resolve, reject) => {
      api
        .put(route, { newColors })
        .then(({ data }) => {
          if (data.status == 200) {
            commit("updatePrimaryColor", data.colors.primaryColor);
            resolve(data);
          } else if (data.status == 400) {
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
