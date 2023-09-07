import axios from 'axios';
import { BASE_URL } from '.';
import { Menu } from '../util/types';
import { getRefresh } from './auth';
import apiInstance from './apiInstance';

export const STORE_CODE = '2B5YG1OHDU9SZTJM7WCXQLEV';
export interface Stock {
  store_code: string;
  stock_name: string;
  stock_id: string;
  stock_price: string;
  stock_description: string;
  stock_option: { [key: string]: number } | null;
  stock_image: string[];
}

// export async function getStocks(): Promise<Stock[] | boolean> {
//   try {
//     const response = await axios.get(`${BASE_URL}/stocks/list`, {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
//       },
//     });
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }
// axios 인스턴스 생성

export async function getStocks(): Promise<Stock[] | any> {
  try {
    const response = await apiInstance.get(
      `/stocks/list?store_code=${STORE_CODE}&stock_id=0IFUHLZKGET9RX8DMCJYWV5Q`,
    );
    console.log(response.data.stocks);
    return response.data.stocks;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// export async function addStocks(item: Stock): Promise<boolean> {
//   try {
//     const response = await axios.post(`${BASE_URL}/stocks/add`, item, {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
//       },
//     });
//     console.log(response);
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }

const items: Stock = {
  store_code: STORE_CODE,
  stock_name: '테스트메뉴',
  stock_id: '1',
  stock_price: '1000',
  stock_description: '테스트메뉴입니다.',
  stock_option: null,
  stock_image: [],
};
export async function addStocks(): Promise<boolean> {
  try {
    const response = await axios.post(`${BASE_URL}/stocks/add`, items, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function tmpGetMenus(): Promise<Menu> {
  const response = await axios.get(`/data/menu.json`);
  console.log(response);
  return response.data;
}
