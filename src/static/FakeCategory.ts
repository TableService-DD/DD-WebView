export type Category = {
  price: number;
  name: string;
  checked: boolean;
};
export const FakeCategory: Category[] = [
  {
    name: '계란말이',
    price: 3000,
    checked: false,
  },
  {
    name: '김치',
    price: 1000,
    checked: false,
  },
  {
    name: '두부',
    price: 2000,
    checked: false,
  },
  {
    name: '우동',
    price: 3000,
    checked: false,
  },
];
