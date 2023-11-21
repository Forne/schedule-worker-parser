import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_at: Date;

  @Column()
  end_at: Date;

  @Column()
  description: string;

  @Column()
  source_type: number;

  @ManyToOne(() => Group, (group) => group.events)
  group: Group;

  @ManyToOne(() => Subject, (subject) => subject.events)
  subject: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.events)
  teacher: Teacher;
}
