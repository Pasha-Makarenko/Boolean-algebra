import { Digits, IHeaders, INormalForm, ISelection, ISet } from "./normalForm.interfaces";
export default class NormalFormService {
    static defaultHeadersKarnaughMap: IHeaders;
    static decToBin: (dec: number, minLength: number) => Array<Digits>;
    static exclude: (count: number, sets: Array<number>) => number[];
    static compareImplicants: (imp1: ISet, imp2: ISet) => boolean;
    static combineImplicants: (imp1: ISet, imp2: ISet) => ISet | undefined;
    static pnf: (count: number, sets: Array<number>) => {
        result: INormalForm;
    };
    static mnf: (count: number, sets: Array<number>) => {
        result: INormalForm;
        selections: ISelection[];
        pnf: INormalForm;
        sets: number[];
    };
    static karnaughMap: (count: number, sets: Array<number>, headers?: IHeaders) => {
        result: Digits[][];
        headers: IHeaders;
    };
}
