export function GetSuccessfulBookAddedStub(dynamicBookId?: string) {
  return {
    success: true,
    result: {
      bookId: dynamicBookId === undefined ? 7 : dynamicBookId,
      message: "Book Added",
    },
  };
}
