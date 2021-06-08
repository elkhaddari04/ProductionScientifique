import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor( ) { }
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        const authData = JSON.parse(
          localStorage.getItem(this.authLocalStorageToken)
        );

         if (authData && authData.authToken) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${authData.authToken}`,
                    'Access-Control-Allow-Origin':'*'                    
                }
            });
        }

        return next.handle(request);
    }
}
