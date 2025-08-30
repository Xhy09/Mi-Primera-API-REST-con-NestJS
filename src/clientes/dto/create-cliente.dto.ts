import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ClienteStatus } from '../entities/cliente.entity';

export class CreateClienteDto {
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'Formato de email inválido' })
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEnum(ClienteStatus, { message: 'status debe ser "activo" o "inactivo"' })
  status?: ClienteStatus;
}
