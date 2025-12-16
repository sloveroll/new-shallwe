'use server'

import { fetchAdminName } from '@/db/queries/admin';

export async function getAdminName() {
    try {
        const name = (await fetchAdminName()) ?? '크리에이터';
        return { success: true, name };
    } catch (error: any) {
        console.error('DB Error:', error);
        return { success: false, error: error.message };
    }
}
