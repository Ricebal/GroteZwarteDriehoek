import { World } from './classes/World';
import { Config } from './classes/Config';

class App {
  private _game: World;

  constructor(game: World) {
    this._game = game;
  }

  public setup(): void {
    this.gameLoop();
    const panicDistanceTextbox = <HTMLInputElement>document.getElementById('panicDistanceText');
    panicDistanceTextbox.value = Config.panicDistance.toString();
    panicDistanceTextbox.addEventListener("change", Config.onPanicDistanceChanged, false);

    const panicDistanceCheckbox = <HTMLInputElement>document.getElementById('panicDistanceCheckbox');
    panicDistanceCheckbox.addEventListener("click", Config.onPanicDistanceToggled, false);
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
