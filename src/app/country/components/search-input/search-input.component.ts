import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  //Inputs
  placeholder = input('Buscar');
  debounceTime = input(300);
  initialValue = input<string>();

  //Outputs
  value = output<string>();

  //Properties
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

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
