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

    public createFLV(varName: string): FuzzyVariable {
        this._variables.set(varName, new FuzzyVariable());
        return this._variables.get(varName);
    }

    public addRule(antecedent: FuzzyTerm, consequence: FuzzyTerm) {
        this._rules.push(new FuzzyRule(antecedent, consequence));
    }

    public fuzzify(name: string, val: number) {

    }

    public defuzzify(name: string): number {
        return; // TODO: Implement this function
    }
}