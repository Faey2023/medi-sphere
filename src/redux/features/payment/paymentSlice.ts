import baseApi from '@/redux/api/baseApi';

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: '/orders',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getOrders: builder.query({
      query: () => '/orders',
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: '/orders/verify',
        params: { order_id },
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
} = paymentApi;
