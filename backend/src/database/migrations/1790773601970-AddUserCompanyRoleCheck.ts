import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserCompanyRoleCheck1790773601970 implements MigrationInterface {
    name = 'AddUserCompanyRoleCheck1790773601970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "CHK_3665d8fff41cb7f9571ee0e297" CHECK ( ("role" ='PLATFORM_ADMIN' AND "companyId" IS NULL )
    OR
    ("role" IN ('COMPANY_ADMIN', 'SECURITY_ANALYST') AND "companyId" IS NOT NULL ))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CHK_3665d8fff41cb7f9571ee0e297"`);
    }

}
