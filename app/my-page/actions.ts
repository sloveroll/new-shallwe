'use server'

import { db } from '@/lib/db';
import { admin } from '@/lib/schema';
import { sql } from 'drizzle-orm';

export async function getAdminName() {
    try {
        // Drizzle: SELECT name FROM admin LIMIT 1
        const result = await db
            .select({ name: admin.name })
            .from(admin)
            .limit(1);

        const name = result[0]?.name || '크리에이터';
        return { success: true, name: name };
    } catch (error: any) {
        console.error('DB Error:', error);
        return { success: false, error: error.message };
    }
}
