import baseApi from '@/redux/api/baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: `/orders`,
        method: 'GET',
      }),
    }),
    getOrdersByEmail: builder.query({
      query: ({ email }: { email: string }) => `/orders?email=${email}`,
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetAllOrderQuery,
  useGetOrdersByEmailQuery,
} = orderApi;
export default orderApi;
