class HttpException extends Error {
  status: number
  message: Error['message']

  constructor(
    status: HttpException['status'],
    message: HttpException['message'] = defaultMessages[status]
  ) {
    super(message)
    this.status = status
    this.message = message
  }
}

export const UnauthorizedStatus = 401
export const ForbiddenStatus = 403

const defaultMessages = {
  [UnauthorizedStatus]: '토큰이 유효하지 않습니다.',
  [ForbiddenStatus]: '인가되지 않은 요청 입니다.',
}

export default HttpException
