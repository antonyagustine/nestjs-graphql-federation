import { EntityManager } from 'typeorm';

export interface IUnitOfWork {
  add(action: (manager: EntityManager) => Promise<void>): void;
  commit(): Promise<void>;
}
