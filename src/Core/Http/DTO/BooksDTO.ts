export type AddNewBookRequestDto = {
  name: string;
  emailOwnerId: string;
};

export type AddNewBookResponseDto = {
  success: boolean;
  result: {
    message: string;
    bookId: number;
  };
};

export type BookDto = {
  success: boolean;
  result: {
    bookId: number;
    name: string;
    emailOwnerId: string;
    devOwnerId: string;
  }[];
};

export type BookListDto = {
  success: boolean;
  result: BookDto[];
};
