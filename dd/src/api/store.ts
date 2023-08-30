import axios from "axios";
import { BASE_URL } from ".";

export interface Store {
  store_code: string;
  store_name: string;
  store_status: true;
}

export async function getStoreList(): Promise<Store[] | boolean> {
  try {
    const response = await axios.get(`${BASE_URL}/store/list`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addStore(store: Store): Promise<boolean> {
  try {
    const response = await axios.post(`${BASE_URL}/store`, store, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
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
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
