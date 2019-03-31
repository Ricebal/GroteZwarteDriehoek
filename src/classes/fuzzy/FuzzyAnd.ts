import { FuzzyTerm } from "./FuzzyTerm";

export class FuzzyAnd extends FuzzyTerm {
    private _terms: Array<FuzzyTerm>;
    constructor(t1: FuzzyTerm, t2: FuzzyTerm = null, t3: FuzzyTerm = null, t4: FuzzyTerm = null) {
        super();
        this._terms = [t1];
        if (t2)
            this._terms.push(t2);
        if (t3)
            this._terms.push(t3);

        if (t4)
            this._terms.push(t4);
    }

    public clone(): FuzzyAnd {
        switch (this._terms.length) {
            case 1: return new FuzzyAnd(this._terms[0]);
            case 2: return new FuzzyAnd(this._terms[0], this._terms[1]);
            case 3: return new FuzzyAnd(this._terms[0], this._terms[1], this._terms[2]);
            case 4: return new FuzzyAnd(this._terms[0], this._terms[1], this._terms[2], this._terms[3]);
        }
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