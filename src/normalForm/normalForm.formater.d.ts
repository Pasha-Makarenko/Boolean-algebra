import NormalFormService, { ISelection, ISet } from "./normalForm.service";
export type TypeNF = "dis" | "con";
export default class NormalFormFormater {
    static defaultFunc: string;
    static defaultArg: string;
    static defaultQuineTableOptions: {
        isSets: boolean;
        arg: string;
        char: string;
        showZeroSelection: boolean;
        showUsedImplicants: boolean;
        core: {
            color: string;
            opacity: number;
        };
    };
    static defaultKarnaughMapOptions: {
        arg: string;
        line: {
            offset: number;
            padding: number;
        };
        area: {
            colors: string[];
            padding: number;
            borderRadius: string;
            thickness: string;
        };
    };
    static signature: (count: number, fn?: string, arg?: string) => string;
    static implicant: (type: TypeNF, set: ISet, arg?: string) => string;
    static nf: (type: TypeNF, count: number, sets: Array<ISet>, fn?: string, arg?: string) => string;
    static selections: (type: TypeNF, selections: Array<ISelection>, arg?: string) => string;
    static quineTable: (type: TypeNF, mnf: ReturnType<typeof NormalFormService.mnf>, options?: Partial<typeof NormalFormFormater.defaultQuineTableOptions>) => string;
    static karnaughMap: (map: ReturnType<typeof NormalFormService.karnaughMap>, mnf: ReturnType<typeof NormalFormService.mnf>, options?: Partial<typeof NormalFormFormater.defaultKarnaughMapOptions>) => string;
}
