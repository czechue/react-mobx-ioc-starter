export function SingleBookResultStub(
  dynamicBookName?: string,
  bookId?: number
) {
  return {
    success: true,
    result: [
      {
        bookId: bookId !== undefined ? bookId : 1,
        name: dynamicBookName !== undefined ? dynamicBookName : "I, Robot",
        emailOwnerId: "g@b.com",
        devOwnerId: "pete+dnd@logicroom.co",
      },
    ],
  };
}
