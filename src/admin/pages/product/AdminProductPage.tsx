import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: product, mutation } = useProduct(id || '');

  const title = id === 'new' ? 'New product' : 'Edit product';
  const subtitle =
    id === 'new'
      ? 'Here you can create a new product.'
      : 'Here you can edit the product.';

  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success(
          `Product ${id === 'new' ? 'created' : 'updated'} successfully!`,
          {
            description: `The product "${data.title}" has been ${id === 'new' ? 'created' : 'updated'} successfully.`,
            position: 'top-right',
          },
        );
        navigate(`/admin/products/${data.id}`); // Redirige al producto recién creado o actualizado
      },
      onError: (error) => {
        console.error('Error creating/updating product', error);
        toast.error(
          `Failed to ${id === 'new' ? 'create' : 'update'} product.`,
          {
            description: `An error occurred while trying to ${id === 'new' ? 'create' : 'update'} the product. Please try again.`,
            position: 'top-right',
          },
        );
      },
    });
  };

  // Validaciones y redirecciones
  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      product={product}
      title={title}
      subTitle={subtitle}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    />
  );
};
