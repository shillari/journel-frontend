import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = ['/api/v1/auth/register', '/api/v1/auth/authenticate']; // URLs to exclude

  // Check if request URL should be excluded
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req); // Send request without modifying it
  }

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Clone and modify request if token exists
  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }) : req;

  return next(authReq);
};
