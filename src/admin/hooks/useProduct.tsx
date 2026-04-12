import { useMutation, useQuery } from '@tanstack/react-query';
import { getProductByIdAction } from '../actions/get-product-by-id.action';
import type { Product } from '@/interfaces/product.interface';
import { createUpdateProductAction } from '../actions/create-update-product.action';

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    //enabled: !!id, // Solo hasta que tenga un ID se va a ejecutar la petición.
  });

  // Manejar la mutación del producto.
  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      console.log('Product created/updated successfully', product);
      // TODO:
      // invalidate cache or update it directly with the new product data.
    },
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log('handleSubmitForm', productLike);
  // };

  return {
    ...query,
    mutation,
  };
};
