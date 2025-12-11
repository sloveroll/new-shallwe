'use server'

import { pool } from '@/lib/db';

export async function getAdminName() {
    try {
        const [rows] = await pool.query('SELECT name FROM admin LIMIT 1');
        // @ts-ignore
        const name = rows[0]?.name || '크리에이터';
        return { success: true, name: name };
    } catch (error: any) {
        console.error('DB Error:', error);
        return { success: false, error: error.message };
    }
}
