import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    clearErrors();
    reset();
  };

  const onHandleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>

        <CardDescription>
          Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your
          account, please download any data or information that you wish to retain.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant="red" size="lg" onClick={confirmUserDeletion}>
          Hapus Akun
        </Button>

        <Modal show={confirmingUserDeletion} onClose={closeModal}>
          <form onSubmit={deleteUser} className="p-6">
            <h2 className="text-lg font-medium text-foreground">Apakah anda yakin menghapus akun anda?</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Setelah akun anda dihapus semua data akun anda akan dihapus secara permanen. Sebelum menghapus akun anda,
              Anda bisa menyimpan infromasi penting terlebih dahulu.
            </p>

            <div className="mt-6">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                ref={passwordInput}
                value={data.password}
                onChange={onHandleChange}
                className="mt-1 block w-3/4"
                placeholder="Password"
              />

              {errors.password && <InputError message={errors.password} className="mt-2" />}
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="button" variant="ghost" size="lg" onClick={closeModal}>
                Cancel
              </Button>

              <Button type="submit" variant="red" size="lg" className="ms-3" disabled={processing}>
                Delete Account
              </Button>
            </div>
          </form>
        </Modal>
      </CardContent>
    </Card>
  );
}
