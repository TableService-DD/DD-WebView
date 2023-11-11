import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SignupInfo, sendPhoneCertRequest, signUp, verifyPhoneCertification } from '../api/auth';

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupInfo>();
  const [phone, setPhone] = useState('');
  const [certCode, setCertCode] = useState('');
  const [phoneCertId, setPhoneCertId] = useState<number | undefined>();
  const [isPhoneCertRequested, setIsPhoneCertRequested] = useState(false);
  const [isPhoneCertVerified, setIsPhoneCertVerified] = useState(false);

  // 타이머 관련 상태
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval : any = null;

    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0 && timerActive) {
      alert('인증 시간이 만료되었습니다. 다시 인증 요청을 해주세요.');
      setIsPhoneCertRequested(false);
      setTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [timer, timerActive]);

  const onSubmit = async (data: SignupInfo) => {
    if (!isPhoneCertVerified) {
      alert('휴대폰 인증을 완료해주세요.');
      return;
    }

    // phoneCertId가 정의되어 있을 때만 data 객체에 추가
    if (phoneCertId !== undefined) {
      data.phone_cert_id = phoneCertId;
    }

    const success = await signUp(data);
    if (success) {
      console.log('회원가입 성공');
      // 추가 로직
    } else {
      console.error('회원가입 실패');
      // 추가 로직
    }
  };

  const handlePhoneCertRequest = async () => {
    try {
      await sendPhoneCertRequest(phone);
      setIsPhoneCertRequested(true);
      setTimer(300); // 5분 타이머 설정
      setTimerActive(true); // 타이머 활성화
      console.log('휴대폰 인증 요청 성공');
    } catch (error) {
      console.error('휴대폰 인증 요청 실패', error);
    }
  };

  const handleVerifyCertCode = async () => {
    try {
      const certId : any = await verifyPhoneCertification(phone, certCode);
      if (certId) {
        setIsPhoneCertVerified(true);
        setPhoneCertId(certId.toString());
        console.log('휴대폰 인증 성공');
        alert('휴대폰 인증이 성공적으로 완료되었습니다.');
      } else {
        throw new Error('인증 ID를 받지 못했습니다.');
      }
    } catch (error) {
      console.error('휴대폰 인증 실패', error);
      alert('휴대폰 인증 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {/* 이름 입력 필드 */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name", { required: true })}
          type="text"
          id="name"
          className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>
  
      {/* 이메일 입력 필드 */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.email && <span className="text-red-500">Email is required</span>}
      </div>
  
      {/* 비밀번호 입력 필드 */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
          className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.password && <span className="text-red-500">Password is required</span>}
      </div>
  
      {/* 전화번호 입력 필드 */}
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
            className="px-4 py-2 bg-primary shrink-0 text-white rounded-md"
          >
            인증 요청
          </button>
        </div>
      </div>
  
      {isPhoneCertRequested && (
        <>
          <div className="mb-4">
            <label htmlFor="certCode" className="block text-sm font-medium text-gray-700">Certification Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="certCode"
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={certCode}
                onChange={e => setCertCode(e.target.value)}
              />
              <button
                type="button"
                onClick={handleVerifyCertCode}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                인증 확인
              </button>
            </div>
          </div>
  
          <div className="mb-4">
            <label htmlFor="phoneCertId" className="block text-sm font-medium text-gray-700">Phone Certification ID</label>
            <input
              type="text"
              id="phoneCertId"
              className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={phoneCertId}
              onChange={e => setPhoneCertId(e.target.value)}
              disabled
            />
          </div>
  
          {/* 타이머 표시 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Remaining Time</label>
            <div className="text-red-500">{Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</div>
          </div>
        </>
      )}
  
      <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded-md">
        Sign Up
      </button>
    </form>
  );

}
  export default SignupForm;
