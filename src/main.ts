import { World } from './classes/World';
import { Config } from './classes/Config';
import { Vector } from './classes/Vector';

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

    const goalBehaviorsCheckbox = <HTMLInputElement>document.getElementById('goalBehaviorsCheckbox');
    goalBehaviorsCheckbox.addEventListener("click", Config.onGoalBehaviorsToggled, false);

    const panicDistanceCheckbox = <HTMLInputElement>document.getElementById('panicDistanceCheckbox');
    panicDistanceCheckbox.addEventListener("click", Config.onPanicDistanceToggled, false);

    const navGridCheckbox = <HTMLInputElement>document.getElementById('navGridCheckbox');
    navGridCheckbox.addEventListener("click", Config.onNavGridToggled, false);

    const lineOfSightCheckbox = <HTMLInputElement>document.getElementById('lineOfSightCheckbox');
    lineOfSightCheckbox.addEventListener("click", Config.onLineOfSightToggled, false);
  }

  private gameLoop(): void {
    requestAnimationFrame(this.gameLoop.bind(this));
    this._game.render();
  }
}

window.onload = () => {
  Config.canvasSize = new Vector(900, 900);

  const canvas = <HTMLCanvasElement>document.getElementById('main');
  let app = new App(new World(canvas));

  app.setup();
  console.log('Game loaded!');
}
