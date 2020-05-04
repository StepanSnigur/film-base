export interface IUserData {
  avatar: {
    gravatar: {
      hash: string
    }
  },
  id: number,
  include_adult: boolean,
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  username: string
}
export interface ISessionData {
  success: boolean,
  session_id: string
}
