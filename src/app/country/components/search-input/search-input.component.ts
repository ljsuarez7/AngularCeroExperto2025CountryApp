import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  //Inputs
  placeholder = input('Buscar');
  debounceTime = input(300);

  //Outputs
  value = output<string>();

  //Properties
  inputValue = signal<string>('');

  //Effects
  debounceEffect = effect((onCleanup) => {

    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });

  });

}
