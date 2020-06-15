import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderFiledToProviderId1592169511485
 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropColumn('appointments', 'provider');

      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
      );

    await queryRunner.createForeignKey('appointmets', new TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

      await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn('appointmets',
     new TableColumn({
      name: 'provider',
      type: 'varchar',
    }))
  }
}
