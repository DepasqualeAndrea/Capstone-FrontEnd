export interface Post {
  postId: number,
  userId: number;
  datacreazione: string,
  description: string,
  comment: {}[],
  imagedata: {
    imageData: string
  }

}
