import { DefaultArg, DefaultKarnaughMapOptions, DefaultNormalFormOptions, DefaultQuineTableOptions, DefaultSelectionsOptions, ISelection, ISet, TypeNF } from "./normalForm.interfaces";
import NormalFormService from "./normalForm.service";
export default class NormalFormFormater {
    static defaultFunc: string;
    static defaultArg: DefaultArg;
    static defaultNormalFormOptions: DefaultNormalFormOptions;
    static defaultSelectionsOptions: DefaultSelectionsOptions;
    static defaultQuineTableOptions: DefaultQuineTableOptions;
    static defaultKarnaughMapOptions: DefaultKarnaughMapOptions;
    static signature: (count: number, fn?: string, arg?: DefaultArg) => string;
    static implicant: (type: TypeNF, set: ISet, arg?: DefaultArg) => string;
    static nf: (type: TypeNF, count: number, sets: Array<ISet>, options?: Partial<DefaultNormalFormOptions>) => string;
    static selections: (type: TypeNF, selections: Array<ISelection>, options?: Partial<DefaultSelectionsOptions>) => string;
    static quineTable: (type: TypeNF, mnf: ReturnType<typeof NormalFormService.mnf>, options?: Partial<DefaultQuineTableOptions>) => string;
    static karnaughMap: (map: ReturnType<typeof NormalFormService.karnaughMap>, mnf: ReturnType<typeof NormalFormService.mnf>, options?: Partial<DefaultKarnaughMapOptions>) => string;
}
