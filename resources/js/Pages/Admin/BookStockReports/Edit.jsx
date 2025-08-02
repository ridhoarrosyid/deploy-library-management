import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowLeft from '@/Components/icons/IconArrowLeft';
import IconStack3 from '@/Components/icons/IconStack3';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Edit(props) {
  const { data, setData, reset, post, processing, errors } = useForm({
    total: props.stock.total ?? 0,
    available: props.stock.available ?? 0,
    loan: props.stock.loan,
    lost: props.stock.lost,
    damaged: props.stock.damaged,
    _method: props.page_settings.method,
  });

  const calculateMinimumTotal = (available, loan, lost, damaged) => available + loan + lost + damaged;

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseInt(value, 10) || 0;
    setData((prevData) => {
      if (name === 'total') {
        const minimumTotal = calculateMinimumTotal(0, prevData.loan, prevData.lost, prevData.damaged);
        const validTotal = newValue >= minimumTotal ? newValue : minimumTotal;
        const totalDiff = validTotal - prevData.total;
        const newAvailable = prevData.available + totalDiff;
        return { ...prevData, total: validTotal, available: newAvailable >= 0 ? newAvailable : 0 };
      }
      return {
        ...prevData,
        [name]: newValue,
      };
    });
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
        <HeaderTitle title={props.page_settings.title} subtitle={props.page_settings.subtitle} icon={IconStack3} />
        <Button variant="orange" size="lg" asChild>
          <Link href={route('admin.book-stock-reports.index')}>
            <IconArrowLeft className={'size-4'} /> Kembali
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={onHandleSubmit} className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="total">Total</Label>
              <Input
                name="total"
                id="total"
                type="number"
                placeholder="Masukkan Total Buku..."
                value={data.total}
                onChange={onHandleChange}
              />
              {errors.total && <InputError message={errors.total} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="available">Tersedia</Label>
              <Input
                name="available"
                id="available"
                type="number"
                placeholder="Masukkan Buku Tersedia..."
                value={data.available}
                onChange={onHandleChange}
                disabled
              />
              {errors.available && <InputError message={errors.available} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="loan">Dipinjam</Label>
              <Input
                name="loan"
                id="loan"
                type="number"
                placeholder="Masukkan Buku Dipinjam..."
                value={data.loan}
                onChange={onHandleChange}
                disabled
              />
              {errors.loan && <InputError message={errors.loan} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="damaged">Rusak</Label>
              <Input
                name="damaged"
                id="damaged"
                type="number"
                placeholder="Masukkan Buku Rusak..."
                value={data.damaged}
                onChange={onHandleChange}
                disabled
              />
              {errors.damaged && <InputError message={errors.damaged} />}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lost">Hilang</Label>
              <Input
                name="lost"
                id="lost"
                type="number"
                placeholder="Masukkan Buku Hilang..."
                value={data.lost}
                onChange={onHandleChange}
                disabled
              />
              {errors.lost && <InputError message={errors.lost} />}
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
