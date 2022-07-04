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

export type CreateAuthorRequestDto = {
  name: string;
  emailOwnerId: string;
  latLon?: [number, number];
  bookIds?: number[];
};

export type CreateAuthorResponseDto = {
  success: boolean;
  result: {
    message: string;
    authorId: number;
  };
};
