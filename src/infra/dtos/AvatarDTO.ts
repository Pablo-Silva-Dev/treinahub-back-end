export interface IAvatarDTO {
  id: string;
  user_id: string;
  url: string;
}

export interface ICreateAvatarDTO{
  user_id: string;
  url: string
}
export interface IUpdateAvatarDTO {
  id: string
  url: string
}

export interface IDeleteAvatarDTO {
  avatar_id: string
  user_id: string
}

