import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountriesServiceService {
  constructor(private apollo: Apollo) {}

  executeQuery<T>(
    query: string,
    variables: Record<string, any>
  ): Observable<T> {
    return this.apollo
      .watchQuery<T>({
        query: gql`
          ${query}
        `, // Convierte el query en un objeto gql
        variables,
      })
      .valueChanges.pipe(
        map((result) => result.data) // Usa map del pipe para transformar el observable
      );
  }
}
