import Equipment from '@modules/equipment/infra/typeorm/entities/Equipment';

export default interface ICreateRequestDTO {
  request_reference: string;
  user_id: number;
  locality_id: number;
  reserveds_date: Date;
  assigns: Equipment[];
}
