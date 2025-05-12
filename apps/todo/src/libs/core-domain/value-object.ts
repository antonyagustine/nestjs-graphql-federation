export abstract class ValueObject<T> {
  constructor(public readonly props: T) { }

  equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}
