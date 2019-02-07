class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private height: number = 900;
    private width: number = 900;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
    }

    public render(): void {
        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        this.ctx.fillRect(10, 10, 50, 50);

        this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        this.ctx.fillRect(30, 30, 50, 50);
    }
}