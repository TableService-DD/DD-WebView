import { atom, selector } from "recoil";

export const cartState = atom({
  key: "cartState",
  default: [],
});

export const addToCart = selector({
  key: "addToCart",
  get: ({ get }) => get(cartState),
  set: ({ set }, newItem) =>
    set(cartState, (prevItems) => [...prevItems, newItem]),
});

export const deleteFromCart = selector({
  key: "deleteFromCart",
  get: ({ get }) => get(cartState),
  set: ({ get, set }, itemRemove) => {
    const cart = get(cartState);
    const newCart = cart.filter((item) => item.name !== itemRemove.name);
    set(cartState, newCart);
  },
});

export const orderFromCart = selector({
  key: "orderFromCart",
  get: ({ get }) => get(cartState),
  set: ({ get, set }) => {
    const cart = get(cartState);
    // 서버에 주문 요청보내기
    const newCart = [];
    set(cartState, newCart);
  },
});
