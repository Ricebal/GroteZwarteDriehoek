import { Vector } from "./Vector";

// Config file
// This class contains static data or user manipulated settings through the ui
// Don't instantiate this class

export class Config {
    public static canvasSize: Vector;

    public static mousePos: Vector;

    public static panicDistanceVisualEnabled: boolean = false;
    public static goalBehaviorsCheckboxEnabled: boolean = false;
    public static lineOfSightVisualEnabled: boolean = false;
    public static panicDistance: number = 200;

    public static navGridVisualEnabled: boolean = false;

    public static onPanicDistanceChanged(e: Event): void {
        const textBox: HTMLInputElement = <HTMLInputElement>e.srcElement;

        let input: number = parseFloat(textBox.value);
        if (!isNaN(input)) {
            Config.panicDistance = input;
        }
    }

    public static onGoalBehaviorsToggled(e: Event): void {
        const checkBox: HTMLInputElement = <HTMLInputElement>e.srcElement;
        Config.goalBehaviorsCheckboxEnabled = checkBox.checked;
    }

    public static onLineOfSightToggled(e: Event): void {
        const checkBox: HTMLInputElement = <HTMLInputElement>e.srcElement;
        Config.lineOfSightVisualEnabled = checkBox.checked;
    }

    public static onPanicDistanceToggled(e: Event): void {
        const checkBox: HTMLInputElement = <HTMLInputElement>e.srcElement;
        Config.panicDistanceVisualEnabled = checkBox.checked;
    }

    public static onNavGridToggled(e: Event): void {
        const checkBox: HTMLInputElement = <HTMLInputElement>e.srcElement;
        Config.navGridVisualEnabled = checkBox.checked;
    }
}