import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { TypedFormGroup } from '../form-group/typed-form-group';

@Injectable({
    providedIn: 'root'
})
export class TypedFormBuilder {
    /**
     * Creates an instance of the TypedFormBuilder service
     */
    constructor(private fb: FormBuilder) { }

    /**
     * Method that creates and returns a typed form group
     * @param controlsConfig A collection of child controls. The key for each child is the name
     * under which it is registered.
     */
    public group<T extends { [key: string]: any }>(controlsConfig: { [K in keyof T]: any }) {
        return new Proxy(this.fb.group(controlsConfig), {}) as TypedFormGroup<T>;
    }
}