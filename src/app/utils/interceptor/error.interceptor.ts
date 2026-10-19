import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const serverMessage = (error.error as { message?: unknown } | null)?.message;
        const message = typeof serverMessage === 'string' ? serverMessage : error.message;

        console.error(
          `[HTTP ${error.status}] ${request.method} ${request.urlWithParams}: ${message}`,
        );
      } else {
        console.error(`HTTP request failed: ${request.method} ${request.urlWithParams}`);
      }

      return throwError(() => error);
    }),
  );