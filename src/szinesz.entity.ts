import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Szinesz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nev: string;

  @Column()
  kor: number;

  @Column()
  film: string;
}
