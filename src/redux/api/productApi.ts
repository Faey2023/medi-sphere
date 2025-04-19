import baseApi from './baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMedicine: builder.query({
      query: () => '/medicines',
    }),
    getSingleMedicine: builder.query({
      query: (id: string) => `/medicines/${id}`,
    }),
  }),
});

export const { useGetAllMedicineQuery, useGetSingleMedicineQuery } = productApi;
