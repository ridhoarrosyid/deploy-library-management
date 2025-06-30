import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
  return <div>ini dashboard</div>;
}

Dashboard.layout = (page) => <AppLayout title={'Dashboard'} children={page} />;
