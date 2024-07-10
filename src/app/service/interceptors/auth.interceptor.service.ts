import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorService: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('userToken');
  if (token == null) {
    return next(req);
  }

  let headers = req.headers || new HttpHeaders();
  headers = headers.append('Authorization', `Bearer ${token}`);

  const modifiedReq = req.clone({
    headers: headers,
  });
  console.log(modifiedReq);
  return next(modifiedReq);
};
