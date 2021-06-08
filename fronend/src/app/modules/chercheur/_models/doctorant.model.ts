import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Doctorant extends BaseModel {
  id: number;
  nom ?: string;
  prenom?: string;
  status?: string;
  intitule_de_la_these?: string;
  directeur?: string;
  co_directeur?: string;
  datesoutenance?: string;

 }
