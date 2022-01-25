export interface MeasurementType {
    id: number;
    name: string;
    description: string;
    unitOfMeasure: string;
}

export interface Measurement {
    id: number;
    dateTime?: string;
    value: number;
    value2?: number;
    measurementTypeId?: number;
    measurementType?: MeasurementType;
}
