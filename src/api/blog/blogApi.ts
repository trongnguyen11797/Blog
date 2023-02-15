// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const path = 'https://5f55a98f39221c00167fb11a.mockapi.io/blogs';

export default {
  async fetchBlogLists({ page, limit }: {page: number, limit: number}) {
    try {
      const resp = await axios.get(`${path}?page=${page}&limit=${limit}`);

      return resp.data;
    } catch (error) {
      return { error: true, msg: 'Error' };
    }
  },
};
