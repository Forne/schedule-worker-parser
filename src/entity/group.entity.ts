import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { University } from './university.entity';
import { Event } from './event.entity';
import { Subject } from './subject.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => University, (university) => university.groups)
  university: University;

  @OneToMany(() => Event, (event) => event.group)
  events: Event[];

  @OneToMany(() => Subject, (subject) => subject.group)
  subjects: Subject[];
}
