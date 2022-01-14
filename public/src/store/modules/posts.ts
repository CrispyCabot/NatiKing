import api from "@/api/api";

export const PostActions = {
  fetchPosts({ getters }: any) {
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/posts` : `/posts`;
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

  fetchPostById({ getters }: any, id: String) {
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/posts/${id}` : `/posts/${id}`;
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
