import axios from "axios";
import { BASE_URL } from ".";
export interface UserInfo {
  email: string;
  password: string;
}

export interface SignupInfo {
  name: string;
  email: string;
  password: string;
  phone_cert_id: number;
}
export interface Tokens {
  access_token: string;
  refresh_token: string;
}
export async function getLogin(userInfo: UserInfo): Promise<boolean> {
  try {
    console.log(userInfo);
    const response = await axios.post(`${BASE_URL}/biz/user`, {
      userInfo
      
    });
    
    if (
      response.status === 200 &&
      response.data &&
      response.data.data &&
      "access_token" in response.data.data
    ) {
      console.log("Login Success:", response.data);
      localStorage.setItem("access_token", response.data.data.access_token);
      localStorage.setItem("refresh_token", response.data.data.refresh_token);
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error("Login Error:", error);
    return false;
  }
}
export async function signUp(userInfo: SignupInfo): Promise<boolean> {
  try {
    const response = await axios.put(`${BASE_URL}/biz/user/`, {
      name: "정종문 ",
      email: "bishoe01@hanyang.ac.kr",
      password: "abcd1234",
      phone_cert_id: 2,
    });
    console.log("SignUp Success:", response.data);
    return true;
  } catch (error: unknown) {
    console.error("SignUp Error:", error);
    return false;
  }
}
// export async function signUp(): Promise<boolean> {
//   const userInfo: SignupInfo = {
//     user_name: "testman",
//     user_id: "testuser",
//     user_pw: "a123",
//     user_email: "bishoe01@kakao.com",
//     user_type: 1,
//     user_phone: "01012341234",
//     is_valid: true,
//   };
//   try {
//     const response = await axios.post(`${BASE_URL}/user/register`, userInfo);
//     console.log("SignUp Success:", response.data);
//     return true;
//   } catch (error: unknown) {
//     console.error("SignUp Error:", error);
//     return false;
//   }
// }

export async function getRefresh(): Promise<boolean> {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/refresh`,
      {},
      {
        params: {
          refresh_token: localStorage.getItem("refresh_token"),
        },
      }
    );

    if (response.status === 200 && response.data) {
      localStorage.setItem("access_token", response.data.access_token);
      console.log("Refresh Success:");
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error("Refresh Error:", error);
    return false;
  }
}
