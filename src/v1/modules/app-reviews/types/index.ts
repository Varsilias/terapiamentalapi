export interface IAppReviewDto {
  location: string;
  review: string;
  user_id: number;
}

export interface IGetAllAppReviewsDto {
  page: number;
  perPage: number;
}
