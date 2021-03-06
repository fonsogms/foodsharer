interface Pictures {
  url: string;
  public_id: string;
}
export interface FoodDto {
  title: string;
  expiryDate: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  pictures: Pictures[];
}
