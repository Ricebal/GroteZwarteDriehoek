import { FuzzyTerm } from "./FuzzyTerm";
import { FuzzySet } from "./FuzzySet";

export class FuzzyVery extends FuzzyTerm {
    private _set: FuzzySet;

    constructor(ft: FuzzySet) {
        super();
        this._set = ft;
    }

    public getDOM(): number {
        return Math.pow(this._set.getDOM(), 2);
    }

    public clearDOM(): void {
        this._set.clearDOM();
    }

    public orWithDOM(val: number): void {
        this._set.orWithDOM(Math.pow(val, 2));
    }

    public clone(): FuzzyVery {
        return new FuzzyVery(this._set);
    }
}