import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  template: `
    <div class="relative">
      <label for="dynamic-select" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>

      <select
        id="dynamic-select"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        [value]="preselected"
        (change)="onOptionChange($event)"
      >
        <option *ngFor="let option of options" [value]="option.id">
          {{ option.viewValue }}
        </option>
      </select>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true,
    },
  ],
})
export class SelectFieldComponent implements ControlValueAccessor {
  @Input() label: string = 'Select an option';
  @Input() options: { id: string; viewValue: string }[] = [];
  @Input() onChangeCallback!: (value: string) => void;
  @Input() preselected: string = '';

  value: string | null = null;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onOptionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.value = selectElement.value;
    this.onChange(this.value);

    if (this.onChangeCallback) {
      this.onChangeCallback(this.value);
    }
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }
}
