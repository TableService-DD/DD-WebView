export type FoodOption = {
  name: string;
  price: number;
};

export type FoodOrigin = {
  name: string;
  country: string;
};

export type FoodItem = {
  name: string;
  price: number;
  image: string;
  bannerImage: string;
  menu_intro: string;
  isBest: boolean;
  foodId: number;
  addOption: FoodOption[];
  origin: FoodOrigin[];
  hotLevel?: number; // hotLevel이 모든 항목에 있는 것이 아니므로 optional로 선언합니다.
};

export type Menu = {
  BURGER: FoodItem[];
  SANDWICH: FoodItem[];
};

export interface Stock {
  store_code: string;
  stock_name: string;
  stock_id: string;
  stock_price: string;
  stock_description: string;
  stock_option: { [key: string]: number } | null;
  stock_images: Blob | any;
  stock_category: string;
}
