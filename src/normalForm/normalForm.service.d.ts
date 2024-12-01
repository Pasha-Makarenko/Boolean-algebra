export type Digits = 0 | 1;
export type ISet = Array<{
    value: Digits;
    index: number;
}>;
export type ISelection = Array<{
    set: ISet;
    indexes: Array<number>;
    used: boolean;
    isCore: boolean;
}>;
export default class NormalFormService {
    static defaultHeadersKarnaughMap: {
        rows: number[][];
        columns: number[][];
    };
    static decToBin: (dec: number, minLength: number) => Array<Digits>;
    static exclude: (count: number, sets: Array<number>) => number[];
    static compareImplicants: (imp1: ISet, imp2: ISet) => boolean;
    static combineImplicants: (imp1: ISet, imp2: ISet) => ISet | undefined;
    static pnf: (count: number, sets: Array<number>) => {
        result: ISet[];
    };
    static mnf: (count: number, sets: Array<number>) => {
        result: ISet[];
        selections: ISelection[];
        pnf: ISet[];
        sets: number[];
    };
    static karnaughMap: (count: number, sets: Array<number>, headers: typeof NormalFormService.defaultHeadersKarnaughMap) => {
        result: Digits[][];
        headers: {
            rows: number[][];
            columns: number[][];
        };
    };
}
