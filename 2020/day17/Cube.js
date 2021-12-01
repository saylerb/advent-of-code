export class Cube {
  constructor({ point, active }) {
    this.point = point;
    this.active = active;
  }

  get inactive() {
    return !this.active;
  }

  printState() {
    if (this.active) {
      return "#";
    } else {
      return ".";
    }
  }
}
