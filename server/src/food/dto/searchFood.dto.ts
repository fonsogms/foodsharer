export class SearchFoodDto {
  search: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
