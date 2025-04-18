import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = resource({
    request: () => ({query: this.query()}),
    loader: async({request}) => {
      if(!request.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    }
  });

}
