import { FieldProps } from './input';

export interface FormOptions {
    [key: string]: FieldProps;
}

interface FormStructureProps {
    id: string | undefined;
    namespace: string;
}

export class FormStructure implements FormStructureProps {
    public fields: FormOptions;
    public id: string | undefined;
    public namespace: string;

    public constructor(fields: FormOptions, namespace: string, id?: string | undefined) {
        this.fields = fields;
        this.namespace = namespace;
        if (id) {
            this.id = id || '';
        }
    }
}
