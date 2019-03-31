import { FuzzySet } from "./FuzzySet";

export class FuzzySetTriangle extends FuzzySet {
    private _peakPoint: number;
    private _leftOffset: number;
    private _rightOffset: number;

    constructor(mid: number, left: number, right: number) {
        super(mid);
        this._peakPoint = mid;
        this._leftOffset = left;
        this._rightOffset = right;
    }

    public clone(): FuzzySetTriangle {
        return new FuzzySetTriangle(this._peakPoint, this._leftOffset, this._rightOffset);
    }

    // Calculate degree of membership for a particular value
    public calculateDOM(val: number): number {
        // Catch divide by zero errors
        if ((this._rightOffset === 0.0 && this._peakPoint === val) || (this._leftOffset === 0.0 && this._peakPoint === val))
            return 1.0;

        // Check if degree of membership is left or right of center
        if ((val <= this._peakPoint) && (val >= (this._peakPoint - this._leftOffset))) {
            let grad: number = 1.0 / this._leftOffset;
            return grad * (val - (this._peakPoint - this._leftOffset));
        } else if ((val > this._peakPoint) && (val < (this._peakPoint + this._rightOffset))) {
            let grad: number = 1.0 / -this._rightOffset;
            return grad * (val - this._peakPoint) + 1.0;
        } else {
            return 0.0;
        }

    }
}