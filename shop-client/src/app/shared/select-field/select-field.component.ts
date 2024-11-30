import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  template: `
    <div class="relative">
      <!-- Label -->
      <label for="dynamic-select" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>

      <!-- Dropdown -->
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
  @Input() label: string = 'Select an option'; // Label for the dropdown
  @Input() options: { id: string; viewValue: string }[] = []; // Options array
  @Input() onChangeCallback!: (value: string) => void; // External function to trigger on change
  @Input() preselected: string = ''; // External function to trigger on change

  value: string | null = null; // Holds the selected value

  // Callback methods for ControlValueAccessor
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  // Handles changes in the dropdown
  onOptionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.value = selectElement.value;
    this.onChange(this.value); // Update the FormControl value

    // Trigger the external callback with the updated value
    if (this.onChangeCallback) {
      this.onChangeCallback(this.value);
    }
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value; // Initialize the value from the parent FormControl
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn; // Register the change callback
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn; // Register the touched callback
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if needed
  }
}
