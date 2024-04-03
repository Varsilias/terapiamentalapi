export interface IGetAllStepsDto {
  page: number;
  perPage: number;
}

export interface ICreateStepOptionsDto {
  name: string;
  description: string;
  options: Array<{ name: string; description: string }>;
}

export interface IUpdateStepOptionsDto {
  options: Array<{ name: string; description: string }>;
  step_id: number;
}

export interface IDeleteStepOptionDto {
  step_id: number;
  option_id: number;
}

export interface IOnBoardDto {
  step_id: number;
  options: number[];
  custom_option?: string;
  user_id: number;
}
