import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([]); //El of es para devolver un observable que emite un []
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      });
      return this.countryService.searchByCountry(request.query);
    }
  });

  //El rxResource trabaja con observables y el resource trabaja con promesas.
  // countryResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async({request}) => {
  //     if(!request.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     );
  //   }
  // });

}
