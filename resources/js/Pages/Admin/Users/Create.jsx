import { DateInput } from '@/Components/DateInput';
import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowLeft from '@/Components/icons/IconArrowLeft';
import IconUsersGroup from '@/Components/icons/IconUsersGroup';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
  const fileInputAvatarRef = useRef(null);
  const { data, setData, reset, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    avatar: null,
    gender: null,
    date_of_birth: null,
    address: '',
    _method: props.page_settings.method,
  });

  const onHandleChange = (e) => setData(e.target.name, e.target.value);
  const onHandleReset = () => {
    reset();
    fileInputAvatarRef.current.value = null;
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
        <HeaderTitle title={props.page_settings.title} subtitle={props.page_settings.subtitle} icon={IconUsersGroup} />
        <Button variant="orange" size="lg" asChild>
          <Link href={route('admin.users.index')}>
            <IconArrowLeft className={'size-4'} /> Kembali
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={onHandleSubmit} className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Nama</Label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Masukkan nama..."
                value={data.name}
                onChange={onHandleChange}
              />
              {errors.name && <InputError message={errors.name} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Masukkan email..."
                value={data.email}
                onChange={onHandleChange}
              />
              {errors.email && <InputError message={errors.email} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="pasword">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Masukkan password..."
                value={data.password}
                onChange={onHandleChange}
              />
              {errors.password && <InputError message={errors.password} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
              <Input
                name="password_confirmation"
                id="password_confirmation"
                type="password"
                placeholder="Masukkan konfirmasi password..."
                value={data.password_confirmation}
                onChange={onHandleChange}
              />
              {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Nomor Handphone</Label>
              <Input
                name="phone"
                id="phone"
                type="tel"
                placeholder="Masukkan Nomor Telepon..."
                value={data.phone}
                onChange={onHandleChange}
              />
              {errors.phone && <InputError message={errors.phone} />}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="avatar">Avatar</Label>
              <Input
                name="avatar"
                id="avatar"
                type="file"
                onChange={(e) => setData(e.target.name, e.target.files[0])}
                ref={fileInputAvatarRef}
              />
              {errors.avatar && <InputError message={errors.avatar} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="gender">Jenis Kelamin</Label>
              <Select defaultValue={data.gender} onValueChange={(value) => setData('gender', value)}>
                <SelectTrigger>
                  <SelectValue>
                    {props.genders.find((gender) => gender.value.toString() === data.gender)?.label ??
                      'Pilih jenis kelamin'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {props.genders.map((gender, index) => (
                    <SelectItem key={index} value={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
              <DateInput setData={setData} data={data.date_of_birth} name={'date_of_birth'} id={'date_of_birth'} />
              {errors.address && <InputError message={errors.address} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="address">Alamat</Label>
              <Input
                name="address"
                id="address"
                type="text"
                placeholder="Masukkan alamat..."
                value={data.address}
                onChange={onHandleChange}
              />
              {errors.address && <InputError message={errors.address} />}
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

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
