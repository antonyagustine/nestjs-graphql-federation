import { Entity } from './entity';
import { DomainEvent } from './domain-event';
import { EventPublisher } from './event-publisher';

export abstract class AggregateRoot<T> extends Entity<T> {
  private readonly domainEventsList: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this.domainEventsList;
  }

  protected addEvent(event: DomainEvent): void {
    this.domainEventsList.push(event);
  }

  clearEvents(): void {
    this.domainEventsList.length = 0;
  }

  async publishEvents(publisher: EventPublisher): Promise<void> {
    await Promise.all(this.domainEventsList.map(event => publisher.publish(event)));
    this.clearEvents();
  }
}
