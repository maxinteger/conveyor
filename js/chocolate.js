import { config } from "../gameConfig.js";
import { rndIntBetween } from "./utils.js";

export class Chocolate {
  constructor(canvasCtx, assets) {
    this.ctx = canvasCtx;
    const bigOrSmall = rndIntBetween(1, 100) > config.smallChocolateChance;
    this.type = bigOrSmall ? "big" : "small";
    this.image = assets[this.type];
    // position in percentage
    this.x = 0;
    this.y = rndIntBetween(3, 7) * 10;
    this.vx =
      100 /
      rndIntBetween(
        config.travellingSpeedThroughScreen * 0.95,
        config.travellingSpeedThroughScreen * 1.05
      );
    this.vy = 100 / 2000; /*ms*/
    this.isAlive = true;
    this.isSelected = false;
  }

  select() {
    if (this.x > 33 && this.x <= 66 && this.type === "small") {
      this.isSelected = true;
    }
  }

  update(timeDiff) {
    if (!this.isSelected) {
      this.x += this.vx * timeDiff;
    } else {
      this.y += this.vy * timeDiff;
    }
    // fix: out fo screen check
    if (this.x > 110 || this.y >= 100) {
      this.isAlive = false;
    }
  }

  render() {
    if (this.isAlive) {
      const x = ((100 - this.x) / 100) * window.innerWidth;
      const y = (this.y / 100) * window.innerHeight;

      this.ctx.drawImage(this.image, x, y);
    }
  }
}
