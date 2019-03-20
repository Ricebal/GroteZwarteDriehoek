import { FuzzyTerm } from "./FuzzyTerm";

export class FuzzyAnd extends FuzzyTerm {
    private _terms: Array<FuzzyTerm>;
    constructor(t1: FuzzyTerm, t2: FuzzyTerm, t3: FuzzyTerm = null, t4: FuzzyTerm = null) {
        super();
        this._terms = [t1.clone(), t2.clone()];
        if (t3)
            this._terms.push(t3);

        if (t4)
            this._terms.push(t4);
    }

    public getDOM(): number {
        let smallest: number = 10000000;

        this._terms.forEach(e => {
            if (e.getDOM() < smallest) {
                smallest = e.getDOM();
            }
        });

        return smallest;
    }

    public orWithDOM(val: number): void {
        this._terms.forEach(e => {
            e.orWithDOM(val);
        });
    }

    public clearDOM(): void {
        this._terms.forEach(e => {
            e.clearDOM();
        });
    }
}