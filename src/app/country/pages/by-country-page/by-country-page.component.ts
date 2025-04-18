import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = resource({
    request: () => ({query: this.query()}),
    loader: async({request}) => {
      if(!request.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      );
    }
  });

}
