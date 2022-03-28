import { FieldProps } from './__input';

export interface FormOptions {
    [key: string]: FieldProps;
}

interface FormStructureProps {
    id: string;
}

export class FormStructure implements FormStructureProps {
    public fields: FormOptions;
    public id: string;

    public constructor(fields: FormOptions, id?: string | undefined) {
        this.fields = fields;
        this.id = id || '';
    }
}
