import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class UserExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost) {
    const [req, res] = host.getArgs();
    let status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    // const message =
    //   exception instanceof HttpException
    //     ? exception.getResponse()
    //     : 'Internal server error';

    if (exception.code === 'ER_DUP_ENTRY') {
      status = 400;
      exception['message'] = `Duplicate entry, ${exception.sqlMessage}`;
    }
    if (exception.response && exception.response.error === 'Bad Request') {
      exception['message'] = exception.response.message;
    }
    if (!res.headersSent) {
      res.status(status).json({
        message: exception['message'],
        exception,
      });
    }
  }
}
