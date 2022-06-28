export type AuthorDto = {
  authorId: number;
  name: string;
  latLon: string;
  bookIds: number[];
};

export type AuthorsListDto = {
  success: boolean;
  result: AuthorDto[];
};
