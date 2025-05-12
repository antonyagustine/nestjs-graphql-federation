import { UniqueIdentifier } from './unique-identifier';

export abstract class Entity<T> {
  protected readonly _id: UniqueIdentifier;
  protected readonly props: T;

  constructor(props: T, id?: UniqueIdentifier) {
    this._id = id ?? new UniqueIdentifier();
    this.props = props;
  }

  get id(): UniqueIdentifier {
    return this._id;
  }

  equals(entity?: Entity<T>): boolean {
    if (!entity) return false;
    return this.id === entity.id;
  }
}
