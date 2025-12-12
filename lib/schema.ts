import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

// admin 테이블 정의 (필요한 컬럼만 우선 정의)
export const admin = mysqlTable('admin', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }), // 길이 모르면 대략적으로 설정 (보통 255)
    phone_number: varchar('phone_number', { length: 20 }),
    // 필요한 다른 컬럼이 있다면 여기에 추가
});
