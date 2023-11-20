import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { UserInfo, getLogin, signUp } from "../api/auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const loginSuccess = await getLogin(userInfo);
      if (loginSuccess) {
        console.log("Login successful");
      } else {
        console.log("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <section className="px-8 py-12 flex flex-col gap-4 relative">
      {isLoading ? (
        <div className="absolute z-10 w-3/4 h-[60%] gap-4 p-4 pb-2 bg-white ring-gray-400 ring-4 shadow-md flex flex-col items-center justify-around rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[20%]">
          <h1 className="text-primary text-3xl font-bold">로딩 중...</h1>
          <HashLoader size={100} color={"#FF6A00"} loading={true} />
          <button
            className="bg-gray-500 text-white p-2  w-full px-6 rounded-md"
            onClick={() => setIsLoading(false)}
          >
            취소하기
          </button>
        </div>
      ) : null}

        <h1 className="text-3xl font-bold mb-1 text-center">Mr.Qr</h1>
        
      <form onSubmit={handleSubmit} className="flex flex-col my-4 gap-2">
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="text-gray-400 text-md text-start">
            이메일
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="border-b-2 px-3 py-1 focus:outline-transparent"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="pw" className="text-gray-400 text-md text-start">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-b-2 px-3 py-1 focus:outline-transparent"
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded-full mt-4"
        >
          로그인
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
