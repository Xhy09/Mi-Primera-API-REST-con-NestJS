export enum ClienteStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export class Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  status: ClienteStatus;
  createdAt: Date;
  updatedAt: Date;
}
