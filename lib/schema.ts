import { mysqlTable, serial, varchar, int, text, timestamp } from 'drizzle-orm/mysql-core';

// admin 테이블 정의 (필요한 컬럼만 우선 정의)
export const admin = mysqlTable('admin', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }), // 길이 모르면 대략적으로 설정 (보통 255)
    phone_number: varchar('phone_number', { length: 20 }),
    // 필요한 다른 컬럼이 있다면 여기에 추가
});

// 캠페인 테이블 정의
export const campaigns = mysqlTable('campaigns', {
    id: serial('id').primaryKey(),
    platform: varchar('platform', { length: 50 }).notNull(),   // 'youtube' | 'instagram'
    type: varchar('type', { length: 50 }).notNull(),       // '쇼츠' | '릴스' | '영상'
    status: varchar('status', { length: 50 }).notNull(),     // '신청 확인' | '진행 중' | '미선정'
    title: varchar('title', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }), // "요즘 잘 쓰는 아이템 추천템" 등

    // 캠페인 상세 정보
    category_label: varchar('category_label', { length: 50 }), // "제품 협찬"

    // 기간 및 일정
    content_start_date: varchar('content_start_date', { length: 20 }), // "11/16(일)"
    content_end_date: varchar('content_end_date', { length: 20 }),     // "11/27(목)"
    guide_send_date: varchar('guide_send_date', { length: 50 }),       // "11/27(목)까지"
    pre_check_end_date: varchar('pre_check_end_date', { length: 50 }), // "11/27(목)까지"
    cash_pay_date: varchar('cash_pay_date', { length: 50 }),           // "11/27(목)까지"
    maintain_period: varchar('maintain_period', { length: 50 }),       // "60일"

    // 기타
    notice: varchar('notice', { length: 500 }), // 유의사항 (간단히 텍스트나 JSON으로 처리 가능)
    exposure_time: varchar('exposure_time', { length: 100 }), // "아르마니 뷰티 30초..."

    announce_date: varchar('announce_date', { length: 100 }), // "선정자 발표: 11/17(월)까지" (형식 자유로움)
    thumbnail: varchar('thumbnail', { length: 255 }),
    user_id: varchar('user_id', { length: 100 }), // 임시 사용자 ID (추후 인증 연동 시 수정)
});

// SNS 연동 테이블
export const users_sns = mysqlTable('users_sns', {
    id: serial('id').primaryKey(),
    user_idx: int('user_idx').notNull(),
    provider_type: varchar('provider_type', { length: 50 }).notNull(), // 'instagram', 'youtube'
    provider_name: varchar('provider_name', { length: 255 }), // username
    provider_user_id: varchar('provider_user_id', { length: 255 }), // instagram_id
    
    sns_token: text('sns_token'), // access_token
    sns_facebook_id: varchar('sns_facebook_id', { length: 255 }), // facebook_page_id
    
    follow_count: int('follow_count'),
    post_count: int('post_count'),
    
    meta_asid: varchar('meta_asid', { length: 255 }),
    
    in_date: timestamp('in_date').defaultNow(),
    up_date: timestamp('up_date').onUpdateNow(),
});
