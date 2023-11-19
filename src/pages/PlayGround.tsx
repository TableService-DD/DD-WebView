import React, { useState, useEffect } from "react";
import { TMPID, getDetailStocks } from "../api/stocks"; // 경로에 따라 적절하게 수정해주세요.

function PlayGround() {
  const [stockImage, setStockImage] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchStockDetail = async () => {
  //     const stockData = await getDetailStocks(TMPID);
  //     if (
  //       stockData &&
  //       stockData.stock_images &&
  //       stockData.stock_images.length > 0
  //     ) {
  //       setStockImage(stockData.stock_images[0]);
  //     }
  //   };

  //   fetchStockDetail();
  // }, []);

  return (
    <div>
      PlayGround
      {stockImage && <img src={stockImage} alt="Stock" />}
    </div>
  );
}

export default PlayGround;
