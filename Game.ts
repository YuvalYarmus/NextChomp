interface point {
  x: number;
  y: number;
  rectX: number;
  eveX: number;
  rectY: number;
  eveY: number;
}
export interface Shape {
  id: string;
  x: number;
  y: number;
  radius: number;
  i: number;
  j: number;
  shouldDraw: boolean;
}
export class Shape implements Shape {
  id: string;
  x: number;
  y: number;
  radius: number;
  i: number;
  j: number;
  shouldDraw: boolean;

  constructor(
    x: number,
    y: number,
    radius: number,
    i: number,
    j: number,
    shouldDraw = true
  ) {
    this.id = `${i}-${j}`;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.i = i;
    this.j = j;
    this.shouldDraw = shouldDraw;
  }

  toString() {
    // return `draw is ${this.shouldDraw}, i is ${this.i}, j is ${this.j}`;
    return `\n[${this.id}]-${this.shouldDraw}\n`;
  }
}

// mimicking a boolean 2d array which will represent the game state
type boolState = boolean[][];
interface GameState {
  array: boolState;
  shapes: Shape[];
  [key: string]: any; // an option to add more values
}

class GameStateObject implements GameState {
  array: boolState = [];
  shapes: Shape[] = [];
}

export class Game {
  n: number;
  m: number;
  globalGameState: string;
  globalShapes: [];
  color: string;
  turns = 0;
//   canvas : HTMLCanvasElement;
//   ctx: CanvasRenderingContext2D;
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d")!;

  constructor(canvas :HTMLCanvasElement | null = null , n: number = -1, m: number = -1) {
    // this.canvas = canvas;
    // this.ctx =  canvas.getContext("2d");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      //document.documentElement.classList.add('dark')
      this.color = "#dbdbdb";
    } else this.color = "black";
    if (n === -1 || m === -1) this.promptGameState();
    else {
      this.n = n;
      this.m = m;
      // this.resetGameStateArray(n, m);
      // this.createShapesByArray(this.globalGameState.array);
    }
  }

  promptGameState() {
    let n: number = parseInt(
      prompt("Please enter the amount of rows you want (no more than 8)") || "8"
    );
    let m: number = parseInt(
      prompt("Please enter the amount of columns you want (no more than 8)") ||
        "5"
    );
    if (isNaN(n) || n > 8) n = 8;
    if (isNaN(m) || m > 8) m = 8;
    this.n = n;
    this.m = m;
    let game: string = "";
    for (let i = 0; i < m; i++) {
      game += n.toString();
    }
    this.globalGameState = game;
  }

  createShapesByState(canvas: HTMLCanvasElement, state: string) {
    // declaring constants
    const width = canvas.width;
    const height = canvas.height;
    const rows = parseInt(state[0]) + 1;
    const columns = state.length;

    // declaring an array which will eventually include all the shapes
    let shapes = [];

    // empty space gap from the corners (from both sides)
    const gapX = Math.floor(width * 0.1 * 0.5);
    const gapY = Math.floor(height * 0.1 * 0.5);
    // calculating maximum bound radius
    const r = Math.floor(
      width > height
        ? (height * 0.85) / (rows > columns ? rows : columns) / 2
        : (width * 0.85) / (rows > columns ? rows : columns) / 2
    );

    // calculating the gap between the space the shapes take and space the canvas has
    const dx = Math.round((width * 0.05) / (columns - 1));
    const dy = Math.round((height * 0.05) / (rows - 1));
    // calculating xI - the first x position we can a shape at
    // and yI - the first y position we can a shape at
    const xI = gapX + r,
      xE = gapX + 2 * r * columns + dx * (columns - 1);
    const yI = gapY + r,
      yE = gapY + 2 * r * rows + dy * (rows - 1);

    // creating the shapes
    for (let j = 0; j < columns; j++) {
      for (let i = 0; i <= parseInt(this.globalGameState[j]); i++) {
        let count_dx = j * dx > 0 ? j * dx : 0;
        let count_dy = i * dy > 0 ? i * dy : 0;
        let fix_lean =
          width - xE + r < 0 || Math.abs(width - xE + r) / 4 + xE > width
            ? 0
            : (width - xE) / 4;
        const x = Math.round(xI + j * 2 * r + count_dx + fix_lean);
        const y = Math.round(yI + i * 2 * r + count_dy);
        let shape = new Shape(x, y, r, i, j, this.inGame(i,j));
        shapes.push(shape);
      }
    }
  }

  /**
   *
   */
  inGame(i: number, j: number) {
    if (j > this.globalGameState.length - 1) return false;
    return i <= parseInt(this.globalGameState[j]);
  }
}
