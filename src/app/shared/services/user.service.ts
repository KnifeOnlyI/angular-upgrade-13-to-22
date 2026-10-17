import {Injectable} from '@angular/core';
import {lastValueFrom, map, Observable, timer} from "rxjs";


export interface User {
  id: string;
  firstname: string;
  lastname: string;
}

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly users = new Array<User>(
    {id: crypto.randomUUID(), firstname: 'John', lastname: 'Doe'},
    {id: crypto.randomUUID(), firstname: 'Mathieu', lastname: 'Tulipe'},
    {id: crypto.randomUUID(), firstname: 'Lena', lastname: 'LaXeniere'},
    {id: crypto.randomUUID(), firstname: 'Margaux', lastname: 'Touquet'},
    {id: crypto.randomUUID(), firstname: 'Maxime', lastname: 'Billancourt'},
  );

  rxSearch(query: { firstname: string, lastname: string }): Observable<Array<User>> {
    const results = !query.firstname && !query.lastname
      ? new Array<User>()
      : this.users.filter(user => user.firstname.toLocaleLowerCase().includes(query.firstname.toLocaleLowerCase())
        && user.lastname.toLocaleLowerCase().includes(query.lastname.toLocaleLowerCase()));

    return timer(2000).pipe(map(() => results));
  }

  async search(query: { firstname: string, lastname: string }): Promise<Array<User>> {
    return lastValueFrom(this.rxSearch(query));
  }
}
