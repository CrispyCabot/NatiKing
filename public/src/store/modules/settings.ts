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
};
