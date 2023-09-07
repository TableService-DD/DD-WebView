import axios from 'axios';
import { BASE_URL } from '.';

export interface CartItem {
  user_id: string;
  table_number: string;
  product_id: string;
  product_price: number;
  product_count: number;
  product_option: { [key: string]: number } | null;
}

export async function getCarts(): Promise<CartItem[] | boolean> {
  try {
    const response = await axios.get(`${BASE_URL}/cart/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addCarts(item: CartItem): Promise<boolean> {
  try {
    const response = await axios.post(`${BASE_URL}/cart/add`, item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteCarts(item: CartItem): Promise<boolean> {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
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
    const response = await axios.put(`${BASE_URL}/cart/update`, item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
