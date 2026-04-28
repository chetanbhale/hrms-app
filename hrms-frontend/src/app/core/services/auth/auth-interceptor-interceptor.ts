import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token  = sessionStorage.getItem('token');
  console.log(token)
    if(token){
      const cloneReq =req.clone({
        setHeaders:{Authorization:`Bearer ${token}`}
      });
      return next(cloneReq)
    }
   return next(req);
};
