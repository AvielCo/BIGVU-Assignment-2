import { IPicture } from './picture.interface';

export class Picture implements IPicture {
  constructor(public name: string, public value: string) {}

  toString() {
    return `name=${this.name}, value=${this.value}`;
  }
}
