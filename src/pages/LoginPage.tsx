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
    const tokens = await getLogin(userInfo);

    setIsLoading(false);

    if (tokens) {
      const storeName = "Starbucks";
      const tableNumber = "1";
      navigate(`/stock/${storeName}/${tableNumber}`);
    } else {
      alert("Login Failed");
    }
  };

  return (
    <section className="px-8 py-12 flex flex-col gap-4 relative">
      <button
        className="bg-sky-400 text-white p-2 w-[200px] rounded-full
      "
        onClick={() =>
          signUp({
            name: "test",
            email: "test",
            password: "test",
            phone_cert_id: 2,
          })
        }
      >
        TESTBTN
      </button>
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

      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold mb-1">DDING DDONG</h1>
        <span className="text-md text-gray-400">
          Please enter your ID and Password
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col my-4 gap-2">
        <div className="flex flex-col mb-2">
          <label htmlFor="id" className="text-gray-400 text-md text-start">
            ID
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
            Password
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
          className="w-full p-2 bg-primary text-white rounded-md mt-4"
        >
          Log In
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
