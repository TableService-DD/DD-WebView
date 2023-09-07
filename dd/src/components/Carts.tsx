import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { useState } from 'react';
import '../style/styles.css';
function Carts() {
  const [isVisible, setIsVisible] = useState(false);
  const cart = [
    {
      name: 'Cheese',
      price: 10000,
      image: '/images/menuImage/image1.png',
      bannerImage: '/images/bannerImage/basic.png',
      menu_intro: '고소한 치즈와 함께 향긋한 고기의 맛이 입 안 가득!',
      isBest: true,
      foodId: 11,
      addOption: [
        { name: '새우', price: 2000 },
        { name: '칠리', price: 3000 },
        { name: '머스타드', price: 3000 },
      ],
      origin: [
        { name: '새우', country: '베트남산' },
        { name: '홍합', country: '국내산' },
      ],
      quantity: 1,
    },
  ];
  return (
    <section className="z-0 sticky mx-auto flex items-center bottom-[70px] w-[80%] h-[65px] right-10">
      <CSSTransition
        in={!isVisible}
        timeout={300}
        classNames="my-node"
        unmountOnExit
      >
        <div className="relative flex justify-start items-center px-2 w-full rounded-xl h-full bg-gradient-to-r from-orange-200 to-primary">
          <div
            id="testbox"
            className="grid grid-cols-none grid-flow-col items-center justify-start x-auto overflow-x-auto overflow-y-hidden max-w-[300px] gap-2 w-4/5 h-[55px]"
          >
            {cart.map((item, index) => (
              <div
                key={index}
                className="relative w-[55px] h-full bg-white rounded-xl"
              >
                <img
                  className="w-full h-[55px] rounded-xl object-contain"
                  src={item.image}
                  alt={item.name}
                />
                <p className="absolute flex justify-center items-center top-0 right-0 bg-primary text-[12px] text-center text-white font-bold w-[16px] h-[16px] rounded-full">
                  <span>{item.quantity}</span>
                </p>
              </div>
            ))}
          </div>
          <button className="fixed bottom-3 text-2xl max-w-sm font-bold w-[80%]  self-center h-[40px] bg-white text-black border-2 border-primary rounded-full">
            주문 준비
          </button>
        </div>
      </CSSTransition>

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
