import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorService: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('userToken');
  if (token == null) {
    return next(req);
  }

  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(modifiedReq);
};
