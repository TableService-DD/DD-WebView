import axios from "axios";
import { BASE_URL } from ".";
import { STORE_CODE } from "./stocks";
import { apiInstance } from "./apiInstance";

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


export const updateStoreInfo = async (bizRegPaperFile: File, bizBankAccountPaperFile: File) => {
  const formData = new FormData();

  // 파일을 FormData 객체에 추가
  formData.append('biz-reg-paper', bizRegPaperFile);
  formData.append('biz-bank-account-paper', bizBankAccountPaperFile);

  // JSON 데이터를 문자열로 변환하여 FormData에 추가
  const jsonData = JSON.stringify({
    ceo_name: "kevin",
    name: "미스터큐알본점",
    biz_reg_number: "7195600409",
    start_date: "20190814",
    administrative_division_id: 1,
    other_address: "상록구 한양대학로 55",
    postal_code: "15588",
    gps_latitude: 1.000000,
    gps_longitude: 1.000000,
    bank_id: 1,
    bank_account: "110598180721"
  });
  formData.append('data', jsonData);

  // 요청 전송 시도
  try {
    const response = await apiInstance.put(`${BASE_URL}/biz/store/my/info`, formData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
