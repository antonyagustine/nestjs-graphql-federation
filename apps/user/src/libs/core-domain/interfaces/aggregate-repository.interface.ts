import { EntityManager } from 'typeorm';

import { AggregateRoot } from "../aggregate-root";

interface IDomainTransaction {
  add(action: (manager: EntityManager) => Promise<void>): void;
  commit(): Promise<void>;
}

export interface IAggregateRepository<T extends AggregateRoot<unknown>, PersistenceModel> {
  reconstruct(user: PersistenceModel): Promise<T | null>;

  mutate(aggregateRoot: T, dt?: IDomainTransaction): Promise<void>;
}
