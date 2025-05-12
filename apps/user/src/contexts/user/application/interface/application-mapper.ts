// libs/core-domain/src/lib/mappers/application-mapper.ts
export abstract class ApplicationMapper<Model, DTO> {
  abstract toDto(domain: Model): DTO;
}
