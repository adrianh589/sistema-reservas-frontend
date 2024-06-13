import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingCounter = 0;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  showLoader(): void {
    this.loadingCounter++;
    this.loading$.next(true);
  }

  hideLoader(): void {
    if (this.loadingCounter > 0) {
      this.loadingCounter--;
    }
    if (this.loadingCounter === 0) {
      this.loading$.next(false);
    }
  }
}
