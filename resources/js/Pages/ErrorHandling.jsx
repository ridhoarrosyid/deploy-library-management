import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { message } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';

export default function ErrorHandling({ status }) {
  const errorMessage = message[status];
  return (
    <>
      <Head title={errorMessage.title} />
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <Card className="text-center">
          <CardContent className="p-8">
            <p className="text-base font-semibold text-orange-500">{errorMessage.status}</p>
            <h1 className="mt-4 text-5xl font-bold leading-tight text-foreground">{errorMessage.title}</h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{errorMessage.description}</p>
            <div className="mt-10 flex items-start justify-center gap-x-6">
              <Button variant="orange" asChild>
                <Link href={'/'}>Kembali ke halaman awal</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
