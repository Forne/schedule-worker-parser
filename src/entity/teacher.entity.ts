import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Event } from './event.entity';
import { University } from './university.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => University, (university) => university.teachers)
  university: University;

  @OneToMany(() => Event, (event) => event.teacher)
  events: Event[];
}
