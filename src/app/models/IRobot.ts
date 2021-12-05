export interface IRobot {
  id: number;
  nom: string;
  statut: string;
  adresse_ip: string;
  KPIs: { label: string; valeur: any }[];
  programmes: Array<String>;
  programme_execute: string;
}
