import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowLeft from '@/Components/icons/IconArrowLeft';
import IconLayoutKanban from '@/Components/icons/IconLayoutKanban';
import InputError from '@/Components/InputError';
import { MultiSelect } from '@/Components/MultiSelect';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Edit(props) {
  const [selectedRoles, setSelectedRoles] = useState(Array.from(new Set(props.user.roles.map((role) => role.id))));
  const { data, setData, reset, post, processing, errors } = useForm({
    email: props.user.email ?? '',
    username: props.user.username ?? '',
    roles: selectedRoles,
    _method: props.page_settings.method,
  });

  const onHandleChange = (e) => setData(e.target.name, e.target.value);
  const onHandleValueChange = (selected) => {
    (setSelectedRoles(selected), setData('roles', selected));
  };
  const onHandleReset = () => {
    reset();
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    post(props.page_settings.action, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (success) => {
        const flash = flashMessage(success);
        if (flash) toast[flash.type](flash.message);
      },
    });
  };

  return (
    <div className="flex w-full flex-col pb-32">
      <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle
          title={props.page_settings.title}
          subtitle={props.page_settings.subtitle}
          icon={IconLayoutKanban}
        />
        <Button variant="orange" size="lg" asChild>
          <Link href={route('admin.assign-users.index')}>
            <IconArrowLeft className={'size-4'} /> Kembali
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={onHandleSubmit} className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="text"
                placeholder="Masukkan email..."
                value={data.email}
                onChange={onHandleChange}
                disabled
              />
              {errors.email && <InputError message={errors.email} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                type="text"
                placeholder="Masukkan username..."
                value={data.username}
                onChange={onHandleChange}
                disabled
              />
              {errors.username && <InputError message={errors.username} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="roles">Izin</Label>
              <MultiSelect
                options={props.roles}
                onValueChange={onHandleValueChange}
                defaultValue={selectedRoles}
                placeholder={'Pilih Peran'}
              />
              {errors.roles && <InputError message={errors.roles} />}
            </div>

            <div className="flex justify-end gap-x-2">
              <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                Reset
              </Button>
              <Button type="submit" variant="orange" size="lg" disabled={processing}>
                Simpan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
