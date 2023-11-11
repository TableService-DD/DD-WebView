import axios , {AxiosError} from "axios";
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

export interface PhoneCertRequest {
  phone_number: string;
}

export interface PhoneCertVerificationRequest {
  phone_number: string;
  certification_code: string;
}

export async function signUp(userInfo: SignupInfo): Promise<boolean> {
  try {
    const { email, password, name, phone_cert_id } = userInfo;
    const response = await axios.put(`${BASE_URL}/biz/user`, {
      email,
      password,
      name,
      phone_cert_id,
    });
    console.log("SignUp Success:", response.data);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("SignUp Axios Error:", error.response?.data || error.message);
    } else {
      console.error("SignUp Error:", error);
    }

    console.log("Error details:", error, userInfo);
    return false;
  }
}

export function sendPhoneCertRequest(phoneNumber: string): Promise<void> {
  const requestData: PhoneCertRequest = {
    phone_number: phoneNumber,
  };
  console.log('Request:', requestData);
  return axios.put(`${BASE_URL}/cert/phone/sms`, 
  {
    phone_number: phoneNumber,
  })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error sending phone certification request:', error);
  });
}
export function verifyPhoneCertification(
  phoneNumber: string, 
  certificationCode: string
): Promise<number | undefined> {
  const requestData: PhoneCertVerificationRequest = {
    phone_number: phoneNumber,
    certification_code: certificationCode,
  };

  return axios.post(`${BASE_URL}/cert/phone/sms`, requestData)
    .then(response => {
      console.log('Phone Certification Verification Response:', response.data);
      return response.data.certification_log_id;
    })
    .catch(error => {
      console.error('Error verifying phone certification:', error);
      return undefined; // 오류 발생 시 undefined 반환
    });
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
