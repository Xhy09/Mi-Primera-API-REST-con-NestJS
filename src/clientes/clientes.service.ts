import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cliente, ClienteStatus } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  private clientes: Cliente[] = [];
  private nextId = 1;

  constructor() {
    // Datos semilla (opcional)
    this.create({ nombre: 'Ana Pérez', email: 'ana@example.com', telefono: '502-5555-1234', status: ClienteStatus.ACTIVO });
    this.create({ nombre: 'Luis Díaz', email: 'luis@example.com', status: ClienteStatus.INACTIVO });
  }

  findAll(): Cliente[] {
    return this.clientes;
  }

  findOne(id: number): Cliente {
    const found = this.clientes.find(c => c.id === id);
    if (!found) throw new NotFoundException(`Cliente #${id} no encontrado`);
    return found;
  }

  create(dto: CreateClienteDto): Cliente {
    const emailExists = this.clientes.some(c => c.email.toLowerCase() === dto.email.toLowerCase());
    if (emailExists) throw new BadRequestException(`El email ${dto.email} ya está registrado`);

    const now = new Date();
    const cliente: Cliente = {
      id: this.nextId++,
      nombre: dto.nombre,
      email: dto.email,
      telefono: dto.telefono,
      status: dto.status ?? ClienteStatus.ACTIVO,
      createdAt: now,
      updatedAt: now,
    };

    this.clientes.push(cliente);
    return cliente;
  }

  update(id: number, dto: UpdateClienteDto): Cliente {
    const cliente = this.findOne(id);

    // Si actualiza email, verificar duplicados
 if (dto.email !== undefined) {
  if (dto.email.toLowerCase() !== cliente.email.toLowerCase()) {
    const emailExists = this.clientes.some(
      (c) => c.email.toLowerCase() === dto.email!.toLowerCase(),
    );
    if (emailExists) {
      throw new BadRequestException(`El email ${dto.email} ya está registrado`);
    }
  }
}

    Object.assign(cliente, dto);
    cliente.updatedAt = new Date();
    return cliente;
  }

  remove(id: number): void {
    const idx = this.clientes.findIndex(c => c.id === id);
    if (idx === -1) throw new NotFoundException(`Cliente #${id} no encontrado`);
    this.clientes.splice(idx, 1);
  }
}
