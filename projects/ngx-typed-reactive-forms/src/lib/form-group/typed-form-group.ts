import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * This class is an abstract class for changing the method signature
 * of generally used methods from FormGroup in '@angular/forms'.
 */
export abstract class TypedFormGroup<T extends { [key: string]: any }> extends FormGroup {
    controls!: { [K in keyof T]: AbstractControl; }
    /**
     * Add a control to the for group
     * @param name Name of the form control
     * @param control Control for the given name
     */
    public abstract addControl(name: keyof T, control: AbstractControl,): void;
    /**
     * Retrieves form control as instance of AbstractControl
     * @param identifier Name of the form control
     */
    public abstract get(identifier: Extract<keyof T, string>): AbstractControl | null;
    /**
     * Retrieves form control as instance of TypedFormGroup
     * @param identifier Name of the form control
     */
    public abstract get<L extends { [key: string]: any; }>(identifier: Extract<keyof T, string>): TypedFormGroup<L>;
    /**
     *  The aggregate value of the `TypedFormGroup`, including any disabled controls.
     */
    public abstract getRawValue(): T;
    /**
     * Patches the value of the control.
     * @param value Value that qualifies to become 'Partial' of type specified while the TypedFormGroup is created
     */
    public abstract patchValue(value: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean; }): void
    /**
     * Registers a control with the group's list of controls.
     * @param name The control name to register in the collection
     * @param control Provides the control for the given name
     */
    public abstract registerControl(name: keyof T, control: AbstractControl): AbstractControl;
    /**
     * Remove a control from this group.
     * @param name Name of the form control
     */
    public abstract removeControl(name: keyof T,): void;
    /**
     * Sets the value of the `TypedFormGroup`. It accepts an object that matches
     * the structure of the group, with control names as keys.
     * @param value Value that qualifies the structure and type of the TypedFormGroup
     */
    public abstract setValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean; }): void;
}
