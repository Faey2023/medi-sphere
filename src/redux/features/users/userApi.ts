import baseApi from '@/redux/api/baseApi';
import { User } from '@/types';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;

export default userApi;
