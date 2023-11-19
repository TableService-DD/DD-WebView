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

export interface Stock{
  id:number,
  name:string,
  price:number,
  options:Object | null,
  describe:string,
  is_signiture_menu:boolean,
  is_best_menu:boolean,
  country_of_origin:string | null,
  allergy_causing_information:string | null,
  status:number,
  image_url:string,

};


export interface StockCategory {
  id:number,
  name:string,
}