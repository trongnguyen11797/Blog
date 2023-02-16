import axios from 'axios';
import { URL_API } from 'src/common/constant';

export default {
  async fetchBlogPagination({ page, limit }: { page: number; limit: number }) {
    try {
      const resp = await axios.get(`${URL_API.blog}?page=${page}&limit=${limit}`);

      return resp.data;
    } catch (error) {
      return { error: true, msg: 'Error' };
    }
  },

  async fetchBlogLists() {
    try {
      const resp = await axios.get(URL_API.blog);

      return resp.data;
    } catch (error) {
      return { error: true, msg: 'Error' };
    }
  },

  async fetchBlogDetail(id: string) {
    try {
      const resp = await axios.get(`${URL_API.blog}/${id}`);

      return resp.data;
    } catch (error) {
      return { error: true, msg: 'Error' };
    }
  },
};
