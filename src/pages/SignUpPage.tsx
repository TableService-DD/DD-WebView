import React, { useState } from "react";
import { SignupInfo, signUp } from "../api/auth";

function SignUpPage() {
  const [signupInfo, setSignupInfo] = useState<Partial<SignupInfo>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true); // 추가된 상태 변수

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "user_email") {
      validateEmail(value); // 이메일 변경시 유효성 검사
    }
  };

  const validateEmail = (email: string) => {
    // 간단한 이메일 유효성 검사 정규 표현식
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsEmailValid(regex.test(email));
  };
  const allFieldsFilled = () => {
    return (
      signupInfo.user_name &&
      signupInfo.user_id &&
      signupInfo.user_pw &&
      signupInfo.user_email &&
      signupInfo.user_phone
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitted Information:", signupInfo);
    setIsLoading(true);

    const success = await signUp(signupInfo as SignupInfo);
    setIsLoading(false);

    if (success) {
      alert("Successfully signed up!");
    } else {
      alert("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="signup-page bg-gray-100 h-screen flex items-start justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              name="user_name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              User ID
            </label>
            <input
              type="text"
              name="user_id"
              placeholder="User ID"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              name="user_pw"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            {!isEmailValid && (
              <span className="text-primary text-sm">
                이메일 형식에 맞게 입력해주세요
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="user_phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className={`w-full p-2 rounded-md ${
                allFieldsFilled()
                  ? "bg-primary text-white"
                  : "bg-grayLight text-white"
              }`}
              disabled={!allFieldsFilled() || isLoading}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
