import { FuzzySet } from "./FuzzySet";

export class FuzzySetRightShoulder extends FuzzySet {
    private _peakPoint: number;
    private _leftOffset: number;
    private _rightOffset: number;

    constructor(peak: number, leftOffset: number, rightOffset: number) {
        super(((peak + rightOffset) + peak) / 2);
        this._peakPoint = peak;
        this._leftOffset = leftOffset;
        this._rightOffset = rightOffset;
    }

    public clone(): FuzzySetRightShoulder {
        return new FuzzySetRightShoulder(this._peakPoint, this._leftOffset, this._rightOffset);
    }

    public calculateDOM(val: number): number {
        if ((this._rightOffset === 0.0 && this._peakPoint === val) || (this._leftOffset === 0.0 && this._peakPoint === val)) {
            return 1.0;
        } else if ((val <= this._peakPoint) && (val > (this._peakPoint - this._leftOffset))) {
            let grad: number = 1.0 / this._leftOffset;
            return grad * (val - (this._peakPoint - this._leftOffset));
        } else if ((val > this._peakPoint) && (val <= this._peakPoint + this._rightOffset)) {
            return 1.0;
        } else {
            return 0.0;
        }
    }
}