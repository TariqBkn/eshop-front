import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberOfOrderLinesInCartService {
  private value = new BehaviorSubject<number>(0);
  currentValue = this.value.asObservable();

  constructor() { }

  pushValue(value : number){
    this.value.next(value);
  }
}
