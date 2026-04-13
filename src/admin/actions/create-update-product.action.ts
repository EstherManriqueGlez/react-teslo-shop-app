import { tesloApi } from '@/api/teslo-api';
import type { Product } from '@/interfaces/product.interface';
import { sleep } from '@/lib/sleep';

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] },
): Promise<Product> => {
  await sleep(1500);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], files = [], ...rest } = productLike;

  const isCreating = id === 'new';

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  console.log({files});

  const { data } = await tesloApi<Product>({
    url: isCreating ? '/products' : `/products/${id}`,
    method: isCreating ? 'POST' : 'PATCH',
    data: rest,
  });

  // console.log('createUpdateProductAction', { data });
  
  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes('http')) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};
