import { TagPayLoad } from "./tag-payload";

export interface PostPayload{
  id?: String;
  content: String;
  title: String;
  username: String
  listTag: any;
}
