// libs/core-domain/src/lib/mappers/infrastructure-mapper.ts
export abstract class InfrastructureMapper<Domain, Persistence> {
  abstract toDomain(persistence: Persistence): Domain;
  abstract toPersistence(domain: Domain): Persistence;
}
