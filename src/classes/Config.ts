import { Vector } from "./Vector";

export class Config {
    public static mousePos: Vector;

    public static panicDistanceVisualEnabled: boolean = false;
    public static panicDistance: number = 200;

    public static onPanicDistanceChanged(e: Event): void {
        const textBox: HTMLInputElement = <HTMLInputElement>e.srcElement;

        let input: number = parseFloat(textBox.value);
        if (!isNaN(input)) {
            Config.panicDistance = input;
        }
    }

    public static onPanicDistanceToggled(e: Event): void {
        const checkBox: HTMLInputElement = <HTMLInputElement>e.srcElement;
        Config.panicDistanceVisualEnabled = checkBox.checked;
    }
}