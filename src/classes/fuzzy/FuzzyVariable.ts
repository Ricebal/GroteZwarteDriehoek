import { FuzzySet } from "./FuzzySet";
import { FuzzySetTriangle } from "./FuzzySetTriangle";
import { FuzzySetLeftShoulder } from "./FuzzySetLeftShoulder";
import { FuzzySetRightShoulder } from "./FuzzySetRightShoulder";

export class FuzzyVariable {
    private _memberSets: Map<string, FuzzySet>;
    private _minRange: number;
    private _maxRange: number;

    constructor() {
        this._minRange = 0.0;
        this._maxRange = 0.0;
        this._memberSets = new Map<string, FuzzySet>();
    }

    public adjustRangeToFit(minBound: number, maxBound: number) {
        if (minBound < this._minRange)
            this._minRange = minBound;

        if (maxBound > this._maxRange)
            this._maxRange = maxBound;
    }

    public addTriangularSet(name: string, minBound: number, peak: number, maxBound: number): FuzzySet {
        this._memberSets.set(name, new FuzzySetTriangle(peak, minBound, maxBound));
        this.adjustRangeToFit(minBound, maxBound);
        return this._memberSets.get(name);
    }

    public addLeftShoulderSet(name: string, minBound: number, peak: number, maxBound: number): FuzzySet {
        this._memberSets.set(name, new FuzzySetLeftShoulder(peak, peak - minBound, maxBound - peak));
        this.adjustRangeToFit(minBound, maxBound);
        return this._memberSets.get(name);
    }

    public addRightShoulderSet(name: string, minBound: number, peak: number, maxBound: number): FuzzySet {
        this._memberSets.set(name, new FuzzySetRightShoulder(peak, peak - minBound, maxBound - peak));
        this.adjustRangeToFit(minBound, maxBound);
        return this._memberSets.get(name);
    }

    public fuzzify(val: number): void {
        if ((val >= this._minRange) && (val <= this._maxRange)) {
            this._memberSets.forEach(e => {
                e.setDOM(e.calculateDOM(val));
            });
        }
    }

    public deFuzzifyMaxAv(): number {
        let bottom: number = 0.0;
        let top: number = 0.0;

        this._memberSets.forEach(e => {
            bottom += e.getDOM();
            top += e.getRepresentativeVal() * e.getDOM();
        });

        console.log(`Bottom: ${bottom}`);
        console.log(`Top: ${top}`);

        if (bottom === 0)
            return 0.0;

        return top / bottom;
    }

    public deFuzzifyCentroid(numSamples: number): number {
        let stepSize: number = (this._maxRange - this._minRange) / numSamples;
        let totalArea: number = 0.0;
        let sumOfMoments: number = 0.0;

        for (let samp: number = 1; samp <= numSamples; ++samp) {
            this._memberSets.forEach(e => {
                let contribution: number = Math.min(e.calculateDOM(this._minRange + samp * stepSize), e.getDOM());
                totalArea += contribution;
                sumOfMoments += (this._minRange + samp * stepSize) * contribution;
            });
        }

        if (totalArea === 0)
            return 0.0;

        return (sumOfMoments / totalArea);
    }
}