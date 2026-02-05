import { tesloApi } from '@/api/teslo-api';
import type { ProductsResponse } from '@/interfaces/products.response';

export const getProductsAction = async () => {
  const { data } = await tesloApi.get<ProductsResponse>('/products');

  console.log({ data });

  return data;
};
