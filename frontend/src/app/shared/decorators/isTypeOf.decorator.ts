import { isDevMode } from '@angular/core';

export default function isTypeOf(requiredType: 'string' | 'boolean' | 'number') {
  return (target: any, prop: string) => {
    if (isDevMode() === false) {
      return;
    }
    /** Internal value we will be changing and returning in our getter */
    let value = null;

    // Create new property with getter and setter
    Object.defineProperty(target, prop, {
      get() {
        return value;
      },
      set(newVal) {
        value = newVal;

        /** Whether the new value matches the required type */
        const matchesRequiredType = typeof newVal === requiredType;

        if (!matchesRequiredType) {
          console.error(
            target.constructor.name +
              `: @Input '${prop}' is expected to be of type ${requiredType}, but type ${typeof newVal} was provided`,
          );
        }
      },
      configurable: true,
      enumerable: true,
    });
  };
}
