import axios from "axios";
import { BASE_URL, IMAGE_URL } from ".";
import { Menu, Stock } from "../util/types";
import apiInstance from "./apiInstance";
export const STORE_CODE = "F1MWOBU2LSVHA9JPDZXER6C4";

const items: Stock = {
  store_code: STORE_CODE,
  stock_category: "음료",
  stock_name: "테스트메뉴",
  stock_id: "1",
  stock_price: "1000",
  stock_description: "테스트메뉴입니다.",
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

export const TMPID = "P3IMZKGCY4UFEL1DJBWQ8R2N";
export async function getStocks(): Promise<Stock[] | any> {
  try {
    const response = await axios.get(
      `${BASE_URL}/stocks/list?store_code=${STORE_CODE}`
    );
    console.log(response.data.stocks);
    return response.data.stocks;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// export async function getDetailStocks(id: string): Promise<Stock | any> {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/stocks/list?store_code=${STORE_CODE}&stock_id=${id}`
//     );

//     const modifiedStock = {
//       ...response.data.stocks[0],
//       stock_image: [`/images/menuImage/sample.png`],
//     };

//     console.log(modifiedStock);
//     return modifiedStock;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

export async function getDetailStocks(id: string): Promise<Stock | any> {
  try {
    const response = await axios.get(
      `${BASE_URL}/stocks/list?store_code=${STORE_CODE}&stock_id=${id}`
    );
    const stock = response.data.stocks[0];

    if (stock && stock.stock_images && Array.isArray(stock.stock_images)) {
      stock.stock_images = stock.stock_images.map(
        (image: string) => `${IMAGE_URL}${image}`
      );
    }

    console.log(stock);
    return stock;
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
