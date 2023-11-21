import { AppDataSource } from './data-source';
import { Event } from './entity/event.entity';
import { University } from './entity/university.entity';
import { Group } from './entity/group.entity';
import { Teacher } from './entity/teacher.entity';
import { Subject } from './entity/subject.entity';
import { fetchSchedule } from './utils/fetchSchedule';

AppDataSource.initialize()
  .then(async () => {
    const universityRepo = await AppDataSource.getRepository(University);
    const groupRepo = await AppDataSource.getRepository(Group);
    const teacherRepo = await AppDataSource.getRepository(Teacher);
    const subjectRepo = await AppDataSource.getRepository(Subject);
    const eventRepo = await AppDataSource.getRepository(Event);

    const group = await groupRepo.findOneBy({ slug: 'mist-23-1' });
    if (group === null) {
      throw new Error('Group not found id DB');
    }
    console.log('Find group entity: ', group);

    const university = await universityRepo.findOneBy(group.university);
    if (university === null) {
      throw new Error('University not found id DB');
    }
    console.log('Find university entity: ', university);

    const parserData = await fetchSchedule();
    if (parserData.length < 1) {
      throw new Error('Parser data corrupt');
    }
    console.log('Fetch parser entities. Found: ', parserData.length);

    // TODO: remove exist events
    for (const i of parserData) {
      const event = new Event();
      event.group = group;
      event.start_at = new Date(i['start']);
      event.end_at = new Date(i['end']);
      event.source_type = 1;

      const indexTextOfSubject = i.subject.indexOf('\n');
      const splitsTextOfSubject = [
        i.subject.slice(0, indexTextOfSubject),
        i.subject.slice(indexTextOfSubject + 1),
      ];

      let teacherName = null;
      if (
        splitsTextOfSubject[1].includes('групп') ||
        splitsTextOfSubject[1].includes('платформ')
      ) {
        event.description = splitsTextOfSubject[1].trim();
      } else {
        event.description = '';
        teacherName = splitsTextOfSubject[1].trim();
        let teacher = await teacherRepo.findOneBy({ name: teacherName });
        console.log('teacher entity: ', teacher);
        if (teacher == null) {
          console.log('Create teacher: ', teacherName);
          teacher = new Teacher();
          teacher.name = teacherName;
          teacher.university = university;
          teacher = await teacherRepo.save(teacher);
          console.log('Created teacher entity: ', teacher);
        }
        event.teacher = teacher;
      }

      const subjectName = splitsTextOfSubject[0].trim();
      let subject = await subjectRepo.findOneBy({ name: subjectName });
      if (subject == null) {
        console.log('Create subject: ', subjectName);
        subject = new Subject();
        subject.name = subjectName;
        subject.group = group;
        subject.isWithoutTeacher = false;
        subject.typeOfCertification = 0; // TODO
        subject = await subjectRepo.save(subject);
        console.log('Created subject entity: ', subject);
      }
      event.subject = subject;

      eventRepo.save(event).then((r) => {
        console.log(r);
      });
    } // END for
  })
  .catch((error) => console.log(error));
