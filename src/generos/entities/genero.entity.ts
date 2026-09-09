import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genero')
export class Genero {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;
}
