import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1700581109083 implements MigrationInterface {
  name = 'Init1700581109083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`teacher\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`universityId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`university\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`subject\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`isWithoutTeacher\` tinyint NOT NULL, \`typeOfCertification\` int NOT NULL, \`groupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`universityId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`start_at\` datetime NOT NULL, \`end_at\` datetime NOT NULL, \`description\` varchar(255) NOT NULL, \`source_type\` int NOT NULL, \`groupId\` int NULL, \`subjectId\` int NULL, \`teacherId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher\` ADD CONSTRAINT \`FK_559284679065ec032d1a1874f78\` FOREIGN KEY (\`universityId\`) REFERENCES \`university\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`subject\` ADD CONSTRAINT \`FK_1221106be055f61612d5b84a9aa\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`group\` ADD CONSTRAINT \`FK_e156c2d8b2b01cd0715fbfabe90\` FOREIGN KEY (\`universityId\`) REFERENCES \`university\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_0a28dcf5832d1068df34fc59e46\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_386cabafbbdeef7890ce93e3b06\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subject\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_046deed7a696fb4223ce8dbdcc3\` FOREIGN KEY (\`teacherId\`) REFERENCES \`teacher\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_046deed7a696fb4223ce8dbdcc3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_386cabafbbdeef7890ce93e3b06\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_0a28dcf5832d1068df34fc59e46\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_e156c2d8b2b01cd0715fbfabe90\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`subject\` DROP FOREIGN KEY \`FK_1221106be055f61612d5b84a9aa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`teacher\` DROP FOREIGN KEY \`FK_559284679065ec032d1a1874f78\``,
    );
    await queryRunner.query(`DROP TABLE \`event\``);
    await queryRunner.query(`DROP TABLE \`group\``);
    await queryRunner.query(`DROP TABLE \`subject\``);
    await queryRunner.query(`DROP TABLE \`university\``);
    await queryRunner.query(`DROP TABLE \`teacher\``);
  }
}
