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

type Book = {
  bookId: number;
  name: string;
  emailOwnerId: string;
  devOwnerId: string;
};

export type BookDto = {
  success: boolean;
  result: Book[];
};

export type BookListDto = {
  success: boolean;
  result: Book[];
};
