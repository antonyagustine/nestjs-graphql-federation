import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { IUnitOfWork } from './unit-of-work.interface';

@Injectable()
export class UnitOfWork implements IUnitOfWork {
  private readonly logger = new Logger(UnitOfWork.name);
  private readonly actions: ((manager: EntityManager) => Promise<unknown>)[] = [];

  constructor(private readonly dataSource: DataSource) { }

  add<T>(action: (manager: EntityManager) => Promise<T>): void {
    this.logger.debug('Action added to DomainTransaction queue');
    this.actions.push(action);
  }

  async commit<T = unknown[]>(): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (!queryRunner.isTransactionActive) {
      throw new Error('Transaction is not active');
    }

    try {
      const results: unknown[] = [];

      for (const action of this.actions) {
        const result = await action(queryRunner.manager);
        results.push(result);
      }
      await queryRunner.commitTransaction();
      this.logger.log('Transaction committed');

      return results as T;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Transaction rolled back due to error', err);
      throw err;
    } finally {
      await queryRunner.release();
      this.actions.length = 0;
    }
  }

  async run<T>(operation: (manager: EntityManager) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (!queryRunner.isTransactionActive) {
      throw new Error('Transaction is not active');
    }

    try {
      const result = await operation(queryRunner.manager);
      await queryRunner.commitTransaction();
      this.logger.log('Domain transaction committed');
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Domain transaction rolled back due to error', err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
