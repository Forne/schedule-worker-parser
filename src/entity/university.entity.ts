import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Group } from './group.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Group, (group) => group.university)
  groups: Group[];

  @OneToMany(() => Teacher, (teacher) => teacher.university)
  teachers: Teacher[];
}
