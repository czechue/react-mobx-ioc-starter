export function GetSuccessfulUserLoginStub() {
  return {
    success: true,
    result: {
      token: "a@b1234.com",
      message: "Success: found user.",
    },
  };
}
