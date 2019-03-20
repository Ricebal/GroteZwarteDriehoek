import { FuzzyTerm } from "./FuzzyTerm";

export class FuzzyRule {
    private _antecedent: FuzzyTerm;
    private _consequent: FuzzyTerm;

    constructor(ant: FuzzyTerm, con: FuzzyTerm) {
        this._antecedent = ant.clone();
        this._consequent = con.clone();
    }

    public calculate(): void {
        this._consequent.orWithDOM(this._antecedent.getDOM());
    }

    public setConfidenceOfConsequentToZero(): void {
        this._consequent.clearDOM();
    }
}