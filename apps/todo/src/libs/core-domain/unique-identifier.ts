import { randomUUID } from 'node:crypto';

export function generateUniqueId(prefix?: string): string {
  return prefix ? `${prefix}_${randomUUID()}` : randomUUID();
}

export class UniqueIdentifier {
  readonly id: string;

  constructor(id?: string) {
    this.id = id ?? generateUniqueId();
  }

  static create(id?: string): UniqueIdentifier {
    return new UniqueIdentifier(id);
  }
}
