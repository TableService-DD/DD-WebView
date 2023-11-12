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
  phone_cert_id?: number; // 'number | undefined'와 동일
}

export interface SignupFormInfo {
  name: string;
  email: string;
  password: string;
  phone_cert_id?: number;
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

export function sendPhoneCertRequest(phoneNumber: string): Promise<any> {
  return axios.put(`${BASE_URL}/cert/phone/sms`, { phone_number: phoneNumber })
    .then(response => {
      console.log('Response:', response.data);
      return response.data; // 서버 응답 반환
    })
    .catch(error => {
      console.error('Error sending phone certification request:', error);
      throw error; // 오류를 다시 던져서 호출자가 처리할 수 있도록 함
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
    const response = await axios.post(`${BASE_URL}/biz/user/`, {
      email: userInfo.email,
      password: userInfo.password,
    });
    
    if (response.status === 200 && response.data && "access_token" in response.data) {
      console.log("Login Success:", response.data);
      sessionStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("refresh_token", response.data.refresh_token);
      return true;
    }
    return false;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // 서버에서 반환한 오류를 처리
      console.error("Login Error:", error.response.data);
    } else {
      // 네트워크 오류나 기타 예외 상황 처리
      console.error("Login Error:", error);
    }
    return false;
  }
}

// export async function getLogin(userInfo: UserInfo): Promise<boolean> {
//   try {
//     const response = await axios.post(`${BASE_URL}/biz/user/`, {
//       email: userInfo.email,
//       password: userInfo.password,
//     }, { withCredentials: true }); // withCredentials 옵션 추가

//     if (response.status === 200 && response.data) {
//       console.log("Login Success:", response.data);
//       // 로컬 스토리지에 토큰 저장하는 부분 제거
//       return true;
//     }
//     return false;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       console.error("Login Error:", error.response.data);
//     } else {
//       console.error("Login Error:", error);
//     }
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
