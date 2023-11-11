import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { SignupFormInfo, SignupInfo, sendPhoneCertRequest, signUp, verifyPhoneCertification } from '../api/auth';
import { AnimatePresence, motion} from 'framer-motion';
import {pageTransitionVariants} from '../util/animation';

function SignupForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormInfo>();
  const [phone, setPhone] = useState('');
  const [certCode, setCertCode] = useState('');
  const [phoneCertId, setPhoneCertId] = useState<number | undefined>();
  const [isPhoneCertVerified, setIsPhoneCertVerified] = useState(false);
  const [isPhoneCertRequested, setIsPhoneCertRequested] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = (newPage) => {
    const direction = newPage > currentPage ? 1 : -1;
    setPage([newPage, direction]);
  };
  // 타이머 관련 상태
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword") as string | any;
  const passwordMatch = password === confirmPassword;
  const handlePhoneCertRequest = async () => {
    if (!phone) {
      alert('전화번호를 입력해주세요.');
      return;
    }
  
    try {
      const response = await sendPhoneCertRequest(phone);
      if (response.status === 200) {
        setIsPhoneCertRequested(true);
        setTimer(300); // 5분 타이머 설정
        setTimerActive(true);
        console.log('휴대폰 인증 요청 성공');
      } else {
        console.error('휴대폰 인증 요청 실패');
      }
    } catch (error) {
      console.error('휴대폰 인증 요청 중 오류 발생', error);
    }
  };
  
  const handleVerifyCertCode = async () => {
    if (!certCode) {
      alert('인증 코드를 입력해주세요.');
      return;
    }
  
    try {
      const verifiedCertId = await verifyPhoneCertification(phone, certCode);
      if (verifiedCertId) {
        setIsPhoneCertVerified(true);
        setPhoneCertId(verifiedCertId);
        console.log('휴대폰 인증 성공');
        setTimerActive(false); // 타이머 비활성화
      } else {
        console.error('휴대폰 인증 실패');
      }
    } catch (error) {
      console.error('휴대폰 인증 실패', error);
    }
  };
  const onSubmit = async (data: SignupInfo) => {
    // 휴대폰 인증이 완료되지 않은 경우 경고
    if (!isPhoneCertVerified) {
      alert('휴대폰 인증을 완료해주세요.');
      return;
    }
  
    const { confirmPassword, ...signupData } = {
      ...data,
      phone_cert_id: phoneCertId,
    };
  
    // 회원가입 요청
    try {
      const success = await signUp(signupData);
      if (success) {
        console.log('회원가입 성공');
        // 회원가입 성공 후 로직 처리 (예: 로그인 페이지로 리디렉션)
      } else {
        console.error('회원가입 실패');
        // 회원가입 실패 처리 (예: 사용자에게 오류 메시지 표시)
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생', error);
      // 예외 처리 로직 (예: 사용자에게 오류 메시지 표시)
    }
  };
  
  
  // 전화번호 인증 페이지 렌더링
  const renderPhoneVerificationPage = () => {
    return (
      <>
        {/* 전화번호 인증 필드 */}
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
  
        {/* 타이머 표시 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Remaining Time</label>
          <div className="text-red-500">{Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</div>
        </div>
      </>
    );
  };
  

  // 회원가입 페이지 렌더링
  const renderSignupPage = () => {
    return (
      <>
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
  
        {/* 비밀번호 확인 입력 필드 */}
        <div className="mb-4 relative">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          {...register("confirmPassword", {
            validate: value => value === password || "비밀번호가 일치하지 않습니다"
          })}
          type="password"
          id="confirmPassword"
          className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        <div className={`absolute inset-y-0 top-6 right-0 pr-3 flex items-center justify-center ${passwordMatch ? 'text-green-500' : 'text-red-500'}`}>
          {confirmPassword && (
            passwordMatch ? <FaCheckCircle size={16} /> : <FaTimesCircle size={16} />
          )}
        </div>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>

      {/* 가입 버튼 */}
        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-primary text-white rounded-md"
          disabled={!password || !confirmPassword || !passwordMatch}
        >
          Sign Up
        </button>
      </>
    );
  };
  

  // 인증 성공 후 페이지 전환
  useEffect(() => {
    if (isPhoneCertVerified) {
      paginate(1);
    }
  }, [isPhoneCertVerified]);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-gray-100 min-h-screen">
        <motion.div
          key={page}
          custom={direction}
          variants={pageTransitionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className='p-4'
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          {page === 0 ? renderPhoneVerificationPage() : renderSignupPage()}
        </motion.div>
        </form>
      </AnimatePresence>
  );
}

export default SignupForm;
