import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {LoadingService} from "./loading.service";
import {finalize} from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(LoadingService);

  loadingService.showLoader();

  return next(req).pipe(
    finalize(() => {
      loadingService.hideLoader();
    })
  );
};
