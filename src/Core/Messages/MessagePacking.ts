export class MessagePacking {
  static unpackServerDtoToPm = (dto: {
    success: boolean;
    result: { message: string };
  }) => {
    return { success: dto.success, serverMessage: dto.result.message };
  };
}
