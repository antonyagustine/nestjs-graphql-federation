import { DomainEvent } from './domain-event';

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}
