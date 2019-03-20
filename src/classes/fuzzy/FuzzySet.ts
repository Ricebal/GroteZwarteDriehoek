export class FuzzySet {
    public dom: number;
    public representativeValue: number;

    constructor(repVal: number) {
        this.representativeValue = repVal;
        this.dom = 0;
    }

    public calculateDOM(val: number): number {
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