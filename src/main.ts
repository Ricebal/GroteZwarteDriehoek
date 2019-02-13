import { Game } from './classes/game';

class App {
  private _game: Game;

  constructor(game: Game) {
    this._game = game;
  }

  public setup(): void {
    this.gameLoop();
  }

  private gameLoop(): void {
    requestAnimationFrame(this.gameLoop.bind(this));
    this._game.render();
  }
}

window.onload = () => {
  const canvas = <HTMLCanvasElement>document.getElementById('main');
  let app = new App(new Game(canvas));

  app.setup();
  console.log('Game loaded!');
}