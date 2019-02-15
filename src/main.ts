import { World } from './classes/World';

class App {
  private _game: World;

  constructor(game: World) {
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
  let app = new App(new World(canvas));

  app.setup();
  console.log('Game loaded!');
}
