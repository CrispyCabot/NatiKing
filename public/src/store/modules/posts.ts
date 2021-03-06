import api from "@/api/api";

export const PostActions = {
  fetchPosts({ getters }: any, payload: any) {
    const { tags, visible } = payload;
    const isUsingMockData = getters.getIsUsingMockData;
    let route = "";
    if (tags.length == 0) {
      route = isUsingMockData ? `/mock/posts` : `/posts`;
    } else {
      route = isUsingMockData
        ? `/mock/postsByTag/${tags}`
        : `/postsByTag/${tags}/${visible}`;
    }
    if (!visible) {
      route = "/invisPosts";
    }
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

  createNewPost({ getters }: any, payload: any) {
    const { ownerID, title, description, tags, visible } = payload;
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/posts/create` : `/posts/create`;
    return new Promise((resolve, reject) => {
      api
        .post(route, { ownerID, title, description, tags, visible })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updatePost({ commit, getters }: any, payload: any) {
    const { postId, updates } = payload;
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData
      ? `/mock/posts/update-post`
      : `/posts/update-post`;
    return new Promise((resolve, reject) => {
      api
        .put(route, { postId, updates })
        .then(({ data }) => {
          if (data.status == 200) {
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
  deletePost({ getters }: any, postId: String) {
    const isUsingMockData = getters.getIsUsingMockData;
    const route = isUsingMockData ? `/mock/posts/delete` : `/posts/delete`;
    return new Promise((resolve, reject) => {
      api
        .post(route, { postId })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
