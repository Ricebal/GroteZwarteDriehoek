import { FuzzyVariable } from "./FuzzyVariable";
import { FuzzyRule } from "./FuzzyRule";
import { FuzzyTerm } from "./FuzzyTerm";

export class FuzzyModule {
    private _variables: Map<string, FuzzyVariable>;
    private _rules: Array<FuzzyRule>;

    constructor() {
        this._rules = [];
        this._variables = new Map<string, FuzzyVariable>();
    }

    private runRules(): void {

    }

    private setConfidenceOfConsequentsToZero(): void {
        this._rules.forEach(e => {
            e.setConfidenceOfConsequentToZero();
        });
    }

    public createFLV(varName: string): FuzzyVariable {
        this._variables.set(varName, new FuzzyVariable());
        return this._variables.get(varName);
    }

    public addRule(antecedent: FuzzyTerm, consequence: FuzzyTerm) {
        this._rules.push(new FuzzyRule(antecedent, consequence));
    }

    public fuzzify(name: string, val: number): void {
        this._variables.get(name).fuzzify(val);
    }

    public defuzzify(name: string, method: string): number {
        this.setConfidenceOfConsequentsToZero();

        this._rules.forEach(e => {
            e.calculate();
        });
        let result = 0;

        if (method === 'maxav') {
            result = this._variables.get(name).deFuzzifyMaxAv();
        } else if (method === 'centroid') {
            const numSamples = 15;
            result = this._variables.get(name).deFuzzifyCentroid(numSamples);
        }

        return result;
    }
}