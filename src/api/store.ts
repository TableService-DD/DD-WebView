import axios from "axios";
import { BASE_URL } from ".";
import apiInstance from "./apiInstance";
import { STORE_CODE } from "./stocks";

export interface Store {
  store_code: string;
  store_name: string;
  store_status: boolean;
}

export async function getStoreList(): Promise<Store[] | boolean> {
  try {
    const response = await apiInstance.get(`${BASE_URL}/order/store/list`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// export async function addStore(store: Store): Promise<boolean> {
//   try {
//     const response = await apiInstance.post(`${BASE_URL}/store`, store);
//     console.log(response);
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }

export async function addStore(): Promise<boolean> {
  const Store: Store = {
    store_code: STORE_CODE,
    store_name: "test",
    store_status: false,
  };
  try {
    const response = await apiInstance.post(
      `${BASE_URL}/order/store/add`,
      Store
    );
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateStore(store: Store): Promise<boolean> {
  try {
    const response = await axios.put(`${BASE_URL}/store`, store, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
