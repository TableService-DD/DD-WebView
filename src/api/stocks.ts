import axios from "axios";
import { BASE_URL, IMAGE_URL } from ".";
import { Menu, Stock, StockCategory } from '../util/types';
import { apiInstance } from "./apiInstance";
export const STORE_CODE = "F1MWOBU2LSVHA9JPDZXER6C4";



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

export async function getStocks(category_id : number): Promise<Stock[] | boolean> {
  try{
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/stock?query=BY_CATEGORY&category_id=${category_id}`
    );
    console.log(response.data);
    return response.data.stocks;
  }
  catch(error){
    console.error(error);
    return false;
}
}

export async function getCategory(): Promise<StockCategory[] | any> {
  try {
    const response = await apiInstance.get(
      `${BASE_URL}/biz/store/category?store_id=1`
    );
    console.log(response.data);
    return response.data.categories;
  } catch (error) {
    console.error(error);
    return error;
  }
}


export async function addStocks(items: Stock): Promise<boolean> {
  try {
    const response = await apiInstance.post(
      `${BASE_URL}/stocks/add/temp`,
      items
    );
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// export async function addStocksImage(images: FormData[]): Promise<boolean> {
//   const formData = new FormData();

//   images.forEach((image, index) => {
//     formData.append(`stock_images`, image.get("image"));
//   });

//   formData.append("store_code", F1MWOBU2LSVHA9JPDZXER6C4);
//   formData.append("stock_id", "");

//   try {
//     const response = await apiInstance.post(`/stocks/add/image`, formData);

//     console.log(response);
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }

export async function tmpGetMenus(): Promise<Stock[]> {
  const response = await axios.get(`/data/fake.json`);
  // console.log(response.data);
  return response.data;
}
