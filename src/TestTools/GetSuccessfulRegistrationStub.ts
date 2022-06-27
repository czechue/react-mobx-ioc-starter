export function GetSuccessfulRegistrationStub() {
  return {
    success: true,
    result: {
      token: "a@b1234.com",
      message: "Success: Limited to one test account per trainee!",
    },
  };
}
