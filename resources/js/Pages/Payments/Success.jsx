import IconCircleCheck from '@/Components/icons/IconCircleCheck';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Head, Link } from '@inertiajs/react';

export default function Success() {
  return (
    <>
      <Head title="Pembayaran Sukses" />
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-sm">
          <Card>
            <CardHeader className="flex flex-row items-center gap-x-2">
              <IconCircleCheck className={'text-green-500'} />
              <div>
                <CardTitle>Berhasil</CardTitle>
                <CardDescription>Pembayaran telah sukses diproses</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-6">
              <p className="text-start text-foreground">
                Terimakasih telah menyelesaikan pembayaran denda, kami dengan senang hati mengkonfirmasi bahwa transaksi
                Anda berhasil di proses
              </p>
              <Button variant="orange" asChild>
                <Link href={route('dashboard')}>Kembali</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
