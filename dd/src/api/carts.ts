import { BASE_URL } from '.';
import apiInstance from './apiInstance';

export interface CartItem {
  user_id: string;
  table_number: string;
  product_id: string;
  product_price: number;
  product_count: number;
  product_option: { [key: string]: number } | null;
  product_image: string[];
}

export async function getCarts(): Promise<CartItem[] | boolean> {
  try {
    const response = await apiInstance.get(`${BASE_URL}/cart/list`);
    console.log(response);

    const modifiedCarts = response.data.data.map((cartItem: CartItem) => {
      return {
        ...cartItem,
        product_image: ['/images/menuImage/image1.png'],
      };
    });

    return modifiedCarts;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addCarts(item: CartItem): Promise<boolean> {
  try {
    const response = await apiInstance.post(`${BASE_URL}/cart/add`, item);
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteCarts(item: CartItem): Promise<boolean> {
  try {
    const response = await apiInstance.delete(`${BASE_URL}/cart/delete`, {
      params: {
        product_id: item.product_id,
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateCarts(item: CartItem) {
  try {
    const response = await apiInstance.put(`${BASE_URL}/cart/update`, item);
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
