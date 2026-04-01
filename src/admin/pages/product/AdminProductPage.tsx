import { Navigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';

export const AdminProductPage = () => {
  const { id } = useParams();

  const { isLoading, isError, data: product } = useProduct(id || '');

  const title = id === 'new' ? 'New product' : 'Edit product';
  const subtitle =
    id === 'new'
      ? 'Here you can create a new product.'
      : 'Here you can edit the product.';

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

  return <ProductForm product={product} title={title} subTitle={subtitle} />;
};
