// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import { addStocks, getDetailStocks, STORE_CODE, TMPID } from "../api/stocks";
// import { generateStockId } from "../util/uuid";
// import { Stock } from "../util/types";
// import { addStore, getStoreList } from "../api/store";

// function TmpDetail() {
//   const [stockData, setStockData] = useState<Partial<Stock>>({
//     store_code: STORE_CODE,
//     stock_id: generateStockId(),
//     stock_option: {},
//     stock_images: [],
//   });

//   const [optionKeys, setOptionKeys] = useState<string[]>([]);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setStockData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedImage(e.target.files[0]);
//     }
//   };

//   const handleOptionChange = (key: string) => {
//     setStockData((prev) => ({
//       ...prev,
//       stock_option: {
//         ...prev.stock_option,
//         [key]: 0,
//       },
//     }));
//   };

//   const handleAddOptionKey = () => {
//     setOptionKeys((prev) => [...prev, ""]);
//   };

//   const handleOptionKeyChange = (index: number, value: string) => {
//     const newOptionKeys = [...optionKeys];
//     newOptionKeys[index] = value;
//     setOptionKeys(newOptionKeys);
//     handleOptionChange(value);
//   };

//   const handleSubmit = async () => {
//     if (stockData) {
//       const formData = new FormData();
//       Object.keys(stockData).forEach((key) => {
//         const value = stockData[key as keyof Stock];
//         if (key === "stock_option" && value) {
//           formData.append(key, JSON.stringify(value));
//         } else if (key !== "stock_images" && value) {
//           formData.append(key, value.toString());
//         }
//       });

//       if (selectedImage) {
//         formData.append("stock_images", selectedImage);
//       }

//       const success = await addStocks(formData);
//       if (success) {
//         alert("Stock added");
//       } else {
//         alert("Error adding stock!");
//         console.log(formData);
//       }
//     }
//   };

//   return (
//     <section className="p-4 bg-gray-100 min-h-screen">
//       <div className="form-container max-w-xl mx-auto bg-white p-6 shadow-md rounded-md">
//         <input
//           type="text"
//           name="stock_name"
//           placeholder="Stock Name"
//           onChange={handleInputChange}
//           className="p-2 w-full border mb-4 rounded"
//         />
//         <input
//           type="text"
//           name="stock_price"
//           placeholder="Stock Price"
//           onChange={handleInputChange}
//           className="p-2 w-full border mb-4 rounded"
//         />
//         <input
//           type="text"
//           name="stock_description"
//           placeholder="Description"
//           onChange={handleInputChange}
//           className="p-2 w-full border mb-4 rounded"
//         />
//         <input
//           type="text"
//           name="stock_category"
//           placeholder="Stock Category"
//           onChange={handleInputChange}
//           className="p-2 w-full border mb-4 rounded"
//         />
//         {optionKeys.map((key, index) => (
//           <input
//             key={index}
//             type="text"
//             value={key}
//             placeholder="Option Key"
//             onChange={(e) => handleOptionKeyChange(index, e.target.value)}
//             className="p-2 w-full border mb-4 rounded"
//           />
//         ))}
//         <input
//           type="file"
//           onChange={handleImageChange}
//           className="p-2 w-full border mb-4 rounded"
//         />
//         <button
//           className="w-full p-2 bg-blue-600 my-4 text-center text-white hover:bg-blue-700 rounded"
//           onClick={handleAddOptionKey}
//         >
//           Add Option Key
//         </button>
//         <button
//           className="w-full p-2 bg-green-600 my-4 text-center text-white hover:bg-green-700 rounded"
//           onClick={handleSubmit}
//         >
//           ADD STOCK
//         </button>
//       </div>
//     </section>
//   );
// }

// export default TmpDetail;
