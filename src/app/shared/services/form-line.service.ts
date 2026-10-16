import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {LineForm} from "@shared/forms/line.form";

@Injectable({providedIn: 'root'})
export class FormLineService {
  saveLines(_lines: Array<LineForm>): Observable<boolean> {
    return of(true);
  }
}
