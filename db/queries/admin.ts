import { db } from "@/lib/db";
import { admin } from "@/lib/schema";

export async function fetchAdminName() {
    const result = await db.select({ name: admin.name }).from(admin).limit(1);
    return result[0]?.name ?? null;
}
