import { getAdminName } from './actions';
import MyPageContent from './MyPageContent';

export default async function MyPage() {
  const { name } = await getAdminName();
  
  return <MyPageContent userName={name ?? '크리에이터'} />;
}
