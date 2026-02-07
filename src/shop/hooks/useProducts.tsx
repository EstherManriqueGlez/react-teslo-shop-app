import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { getProductsAction } from '../actions/get-products.action';

export const useProducts = () => {
  // TODO: add logic here
  const [searchParams] = useSearchParams();

  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const sizes = searchParams.get('sizes') || undefined;

  console.log({ sizes });
  
  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: ['products', { limit, offset, sizes }],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
      }),

    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
