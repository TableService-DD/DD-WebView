import axios from 'axios';
import { BASE_URL } from '.';
import { Menu } from '../util/types';

export interface Stock {
  store_code: string;
  stock_name: string;
  stock_id: string;
  stock_price: string;
  stock_description: string;
  stock_option: { [key: string]: number } | null;
}

export async function getStocks(): Promise<Stock[] | boolean> {
  try {
    const response = await axios.get(`${BASE_URL}/stocks/list`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addStocks(item: Stock): Promise<boolean> {
  try {
    const response = await axios.post(`${BASE_URL}/stocks`, item, {
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
// export async function tmpGetMenus(): Promise<Menu> {
//   const filePath = path.join(process.cwd(), 'public', 'data', 'menu.json');
//   return readFile(filePath, 'utf-8').then<Menu>(JSON.parse);
// }

export async function tmpGetMenus(): Promise<Menu> {
  const response = await axios.get(`/data/menu.json`);
  console.log(response);
  return response.data;
}
