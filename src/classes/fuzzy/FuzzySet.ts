import { FuzzyTerm } from "./FuzzyTerm";

export class FuzzySet extends FuzzyTerm {
    public dom: number;
    public representativeValue: number;

    constructor(repVal: number) {
        super();
        this.representativeValue = repVal;
        this.dom = 0;
    }

    public clone(): FuzzySet {
        return new FuzzySet(this.representativeValue);
    }

    public calculateDOM(val: number): number {
        console.log('This shouldn\'t happen');
        return; // TODO: Implement this function
    }

    public getDOM(): number {
        return this.dom;
    }

    public setDOM(value: number): void {
        this.dom = value;
    }

    public clearDOM(): void {
        this.dom = 0;
    }

    public orWithDOM(val: number): void {
        if (val > this.dom)
            this.dom = val;
    }

    public getRepresentativeVal(): number {
        return this.representativeValue;
    }
}