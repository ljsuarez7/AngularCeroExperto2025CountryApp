import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]>{

    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        catchError(error => {
          console.log({error});
          return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`));
        })
      );

  }

  searchByCountry(query: string): Observable<Country[]>{

    const url = `${API_URL}/name/${query}`;
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        // delay(2000), //Esto es para que espere 3 segundos a hacer la petición. En este caso lo hemos puesto para probar el estado loading
        catchError(error => {
          console.log({error});
          return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`));
        })
      );

  }

  searchCountryByAlphaCode(code: string){

    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        map(countries => countries.at(0)),
        // delay(2000), //Esto es para que espere 3 segundos a hacer la petición. En este caso lo hemos puesto para probar el estado loading
        catchError(error => {
          console.log({error});
          return throwError(() => new Error(`No se pudo obtener países con ese código: ${code}`));
        })
      );

  }

}
