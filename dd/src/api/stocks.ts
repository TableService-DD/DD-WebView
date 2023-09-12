import axios from 'axios';
import { BASE_URL } from '.';
import { Menu, Stock } from '../util/types';
import apiInstance from './apiInstance';
export const STORE_CODE = '2B5YG1OHDU9SZTJM7WCXQLEV';

const items: Stock = {
  store_code: STORE_CODE,
  stock_name: '테스트메뉴',
  stock_id: '1',
  stock_price: '1000',
  stock_description: '테스트메뉴입니다.',
  stock_option: null,
  stock_image: [],
};

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

// export async function getStocks(): Promise<Stock[] | any> {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/stocks/list?store_code=${STORE_CODE}`,
//     );
//     console.log(response);
//     return response.data.stocks;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }
export async function getStocks(): Promise<Stock[] | any> {
  try {
    const response = await axios.get(
      `${BASE_URL}/stocks/list?store_code=${STORE_CODE}`,
    );

    const modifiedStocks = response.data.stocks.map((stock: Stock) => {
      return {
        ...stock,
        stock_image: [`/images/menuImage/image1.png`],
      };
    });

    console.log(modifiedStocks);
    return modifiedStocks;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getDetailStocks(id: string): Promise<Stock | any> {
  try {
    const response = await axios.get(
      `${BASE_URL}/stocks/list?store_code=${STORE_CODE}&stock_id=${id}`,
    );

    const modifiedStock = {
      ...response.data.stocks[0],
      stock_image: [`/images/menuImage/image1.png`],
    };

    console.log(modifiedStock);
    return modifiedStock;
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

export async function addStocks(items: Stock): Promise<boolean> {
  try {
    const response = await apiInstance.post(`${BASE_URL}/stocks/add`, items);
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addStocksImage(images: FormData[]): Promise<boolean> {
  const formData = new FormData();

  images.forEach((image, index) => {
    formData.append(`stock_images`, image.get('image'));
  });

  formData.append('store_code', STORE_CODE);
  formData.append('stock_id', '0IFUHLZKGET9RX8DMCJYWV5Q');

  try {
    const response = await apiInstance.post(`/stocks/add/image`, formData);

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
