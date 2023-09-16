import axios from 'axios';
import { BASE_URL } from '.';
import apiInstance from './apiInstance';
import { STORE_CODE } from './stocks';

export type OptionItem = {
  [key: string]: {
    price: number;
    quantity: number;
  };
};
export interface OrderItem {
  store_code: string;
  table_number: string;
  product_id: string;
  product_price: number;
  product_count: number;
  product_option: OptionItem | null;
  product_status: boolean;
}

export async function getOrders(): Promise<OrderItem[] | boolean> {
  try {
    const response = await apiInstance.get(`${BASE_URL}/order/list`, {
      params: {
        store_code: STORE_CODE,
        table_number: 1,
        status: false,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addOrders(item: OrderItem): Promise<boolean> {
  try {
    const response = await apiInstance.post(`${BASE_URL}/cart/add`, item);
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteOrders(item: OrderItem): Promise<boolean> {
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
