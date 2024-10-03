import { UserDetailPage } from '@components/organisms/pages/user-detail';

export const metadata = {
  title: 'User Detail',
  description: 'User Detail',
};

export default function Page({ params }: { params: { id: string } }) {
  return <UserDetailPage id={params.id} />;
}
