import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import '../style/styles.css';
import { CartItem, getCarts } from '../api/carts';
import '../App.css';
function Carts({ carts }: { carts: CartItem[] }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="z-0 sticky mx-auto flex items-center bottom-[70px] w-[80%] h-[65px] right-10">
      {!isVisible && (
        <div className="relative flex justify-start items-center px-2 w-full rounded-xl h-full bg-gradient-to-r from-orange-200 to-primary">
          <div
            id="testbox"
            className="grid grid-cols-none grid-flow-col items-center justify-start x-auto overflow-x-auto overflow-y-hidden max-w-[300px] gap-2 w-4/5 h-[55px]"
          >
            {carts.map((item, index) => (
              <div
                key={index}
                className="relative w-[55px] h-full bg-white rounded-xl"
              >
                <img
                  className="w-full h-[55px] rounded-xl object-contain"
                  src={item.product_image[0]}
                  alt={item.product_id}
                />
                <p className="absolute flex justify-center items-center top-0 right-0 bg-primary text-[12px] text-center text-white font-bold w-[16px] h-[16px] rounded-full">
                  <span>{item.product_count}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        onClick={() => setIsVisible(!isVisible)}
        className={`absolute -right-4 bottom-[34px] transform translate-y-1/2 w-[75px] h-[75px] z-99 rounded-full flex justify-center items-center p-2 text-5xl bg-primary text-white ${
          isVisible && 'opacity-50'
        }`}
      >
        <PiShoppingCartSimpleFill />
      </div>
    </section>
  );
}

export default Carts;
