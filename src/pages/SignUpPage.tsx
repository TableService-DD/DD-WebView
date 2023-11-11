import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignupInfo, sendPhoneCertRequest, signUp } from '../api/auth';

type Props = {};

function SignupForm({}: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupInfo>();
  const [phone, setPhone] = useState('');

  const onSubmit = async (data: SignupInfo) => {
    const success = await signUp(data);
    if (success) {
      console.log('회원가입 성공');
      // 회원가입 성공 시 추가 로직
    } else {
      console.error('회원가입 실패');
      // 회원가입 실패 시 추가 로직
    }
  };

  const handlePhoneCertRequest = () => {
    sendPhoneCertRequest(phone)
      .then(() => {
        console.log('휴대폰 인증 요청 성공');
        // 휴대폰 인증 요청 성공 시 추가 로직
      })
      .catch(error => {
        console.error('휴대폰 인증 요청 실패', error);
        // 휴대폰 인증 요청 실패 시 추가 로직
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {/* Name, Email, Password 입력 필드 */}
      {/* ... */}

      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <div className="flex gap-2">
          <input
            type="tel"
            id="phone"
            className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <button
            type="button"
            onClick={handlePhoneCertRequest}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            인증 요청
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="phone_cert_id" className="block text-sm font-medium text-gray-700">Phone Certification ID</label>
        <input
          {...register("phone_cert_id", { required: true })}
          type="number"
          id="phone_cert_id"
          className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.phone_cert_id && <span className="text-red-500">Phone certification ID is required</span>}
      </div>

      <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded-md">
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
