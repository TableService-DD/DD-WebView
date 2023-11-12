import React, { useState } from 'react';
import { updateStoreInfo } from '../api/store';

function MyStore() {
  const [bizRegPaper, setBizRegPaper] = useState(null);
  const [bizBankAccountPaper, setBizBankAccountPaper] = useState(null);

  const handleBizRegPaperChange = (e) => {
    setBizRegPaper(e.target.files[0]);
  };

  const handleBizBankAccountPaperChange = (e) => {
    setBizBankAccountPaper(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bizRegPaper && bizBankAccountPaper) {
      await updateStoreInfo(bizRegPaper, bizBankAccountPaper);
    } else {
      console.error('파일을 선택해주세요.');
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bizRegPaper">사업자등록증: </label>
          <input type="file" id="bizRegPaper" onChange={handleBizRegPaperChange} />
        </div>
        <div>
          <label htmlFor="bizBankAccountPaper">통장사본: </label>
          <input type="file" id="bizBankAccountPaper" onChange={handleBizBankAccountPaperChange} />
        </div>
        <button type="submit" className="bg-orange-400 p-2 rounded-full text-white">
          업데이트
        </button>
      </form>
    </section>
  );
}

export default MyStore;
