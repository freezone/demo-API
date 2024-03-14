import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        console.log('Intercepto detected a possible error')
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key])
                }
              }
              throw modelStateErrors.flat();
            } else {
              toastr.error(error.error, error.status.toString());
            }
            break;

          case 401:
            toastr.error('Unauthorized', error.status.toString());
            break;

          case 404:
            router.navigateByUrl('/not-found');
            break;

          case 500:
            const navitationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navitationExtras);
            break;

          default:
            toastr.error('Something unexpected went wrong');
            console.log(error);
            break;
        }
      }
      throw error;
    })
  );
};
