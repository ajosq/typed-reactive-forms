import { Validators } from '@angular/forms';

/**
 * Enum for naming and maintaining commonly
 * used form control definitions
 * Ex: DefaultRequired stands for a form-control with initial value
 * as empty string and having required validator
 */
export enum FormControlTypes {
    DefaultRequired = 'DefaultRequired',
    DefaultNoValidation = 'DefaultNoValidation'
}

export type FormDefinition<T extends { [key: string]: any }> = {
    DefaultRequired?: (Extract<keyof T, string>)[];
    DefaultNoValidation?: (Extract<keyof T, string>)[];
};

/**
 * Commonly used form control definitions can be provided
 * here.
 * Ex: A form control with no initial value and having required field validation
 * may be used in multiple places in the project. Such control definitions can be
 * kept within this constant for reuse.
 */
const FormControlTypeDefinition: { [key: string]: any } = {
    [FormControlTypes.DefaultRequired]: ['', Validators.required],
    [FormControlTypes.DefaultNoValidation]: ['']
};

const getControlDefinition = <T extends { [key: string]: any }>(arr: (Extract<keyof T, string>)[], controlType: FormControlTypes) => {
    const result: { [key: string]: any } = {};
    arr?.forEach((formControlName) => {
        result[(formControlName as string)] = FormControlTypeDefinition[controlType];
    });
    return result;
};

/**
 * A helper class for initializing FormGroup in reactive forms
 * in a better way. Instead of creating a FormGroup like,
 * `
 *  this.fb.group({
    SSN: ['', Validators.required],
    Occupation: [''],
    Email: ['', Validators.required],
    DateOfBirth: [''],
    });
    "You can do it as shown below"
    this.fb.group(
        new ReactiveFormHelper<IPersonalInfo>()
            .setDefaultControls({
                DefaultRequired: ['SSN', 'Email'],
                DefaultNoValidation: ['DateOfBirth', 'Occupation'],
            })
            .create()
    )
 * `
 */
export class ReactiveFormHelper<T extends { [key: string]: any; }> {

    private defaultControls: any = {};

    constructor() { }

    /**
     * Creates and returns the object for form group creation
     * @param controlsConfig Additional control configurations - any form controls
     * with different validators or initial value other than empty string
     */
    public create(controlsConfig?: Partial<{ [K in keyof T]: any }>) {
        return {
            ...this?.defaultControls,
            ...controlsConfig
        };
    }

    /**
     * Creates and sets the object for FormGroup creation
     * @param formDef Configuration for controls matching the default
     * form control definitions
     */
    public setDefaults(formDef: FormDefinition<T>) {
        const { DefaultNoValidation, DefaultRequired } = formDef;
        this.defaultControls = {
            ...(DefaultNoValidation && getControlDefinition(DefaultNoValidation, FormControlTypes.DefaultNoValidation)),
            ...(DefaultRequired && getControlDefinition(DefaultRequired, FormControlTypes.DefaultRequired)),
        };
        return this;
    }

}