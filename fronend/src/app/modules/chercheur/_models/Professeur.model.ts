import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Professeur extends BaseModel {
  id: number;
  nom ?: string;
  prenom?: string;
  grade?: string;
  etablissement?: string;
   specialite?: string;
 }
