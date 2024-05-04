export interface ICreateCategoryDto {
  name: string;
  description: string;
}

export interface IGetAllCatgeoriesDto {
  page: number;
  perPage: number;
}

export interface ICreateTherapistDto {
  firstname: string;
  lastname: string;
  location: string;
  charges_per_hour: number;
  experience: number;
  profile_image?: string;
  bio: string;
  category_id: number;
  email: string;
  specialties: number[];
}

export interface IUpdateTherapistDto
  extends Partial<Omit<ICreateTherapistDto, "category_id" | "email">> {
  id: number;
}

export interface ICreateReviewDto {
  location: string;
  review: string;
  user_id: number;
  therapist_id: number;
}
