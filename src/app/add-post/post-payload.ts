import { TagPayLoad } from "./tag-payload";

export class PostPayload{
  id!: String;
  content!: String;
  title!: String;
  username!: String
  tags: TagPayLoad[] = [];
}
