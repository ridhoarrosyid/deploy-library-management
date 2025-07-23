import HeaderTitle from '@/Components/HeaderTitle';
import IconUser from '@/Components/icons/IconUser';
import AppLayout from '@/Layouts/AppLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit(props) {
  return (
    <>
      <div className="flex w-full flex-col pb-32">
        <div className="lg: mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
          <HeaderTitle title={props.page_settings.email} subtitle={props.page_settings.subtitle} icon={IconUser} />
        </div>
        <UpdateProfileInformationForm mustVerifyEmail={props.mustVerifyEmail} status={props.status} className="mb-8" />
        <UpdatePasswordForm className="mb-8" />
        <DeleteUserForm className="mb-8" />
      </div>
    </>
  );
}

Edit.layout = (pages) => <AppLayout title={'Edit Profile'} children={pages} />;
