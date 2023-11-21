import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { Event } from './event.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isWithoutTeacher: boolean;

  @Column()
  typeOfCertification: number;

  @ManyToOne(() => Group, (group) => group.subjects)
  group: Group;

  @OneToMany(() => Event, (event) => event.subject)
  events: Event[];
}
