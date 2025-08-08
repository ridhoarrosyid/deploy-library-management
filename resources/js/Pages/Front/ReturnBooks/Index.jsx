import CardStat from '@/Components/CardStat';
import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowDownUp from '@/Components/icons/IconArrowDownUp';
import IconChecklish from '@/Components/icons/IconChecklish';
import IconCreditCardRefund from '@/Components/icons/IconCreditCardRefund';
import IconEye from '@/Components/icons/IconEye';
import IconMoneybag from '@/Components/icons/IconMoneybag';
import IconRefresh from '@/Components/icons/IconRefresh';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage, formatToRupiah } from '@/lib/utils';
import { useFilter } from '@/Pages/hooks/useFilter';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Index(props) {
  const { data: return_books, meta } = props.return_books;
  const [params, setParams] = useState(props.state);

  const onSortable = (field) => {
    setParams({ ...params, field: field, direction: params.direction === 'asc' ? 'desc' : 'asc' });
  };

  useFilter({ route: route('front.return-books.index'), values: params, only: ['return_books'] });
  return (
    <div className="flex w-full flex-col space-y-4 pb-32">
      <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle
          title={props.page_settings.title}
          subtitle={props.page_settings.subtitle}
          icon={IconCreditCardRefund}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <CardStat
          data={{
            title: 'Dikembalikan',
            icon: IconCreditCardRefund,
            background: 'text-white bg-gradient-to-right from-green-400 via-green-500 to-green-500',
            iconClassName: 'text-white',
          }}
        >
          <div className="text-2xl font-bold">{props.page_data.returned}</div>
        </CardStat>
        <CardStat
          data={{
            title: 'Pengecekan',
            icon: IconChecklish,
            background: 'text-white bg-gradient-to-right from-blue-400 via-blue-500 to-blue-500',
            iconClassName: 'text-white',
          }}
        >
          <div className="text-2xl font-bold">{props.page_data.checked}</div>
        </CardStat>
        <CardStat
          data={{
            title: 'Denda',
            icon: IconMoneybag,
            background: 'text-white bg-gradient-to-right from-red-400 via-red-500 to-red-500',
            iconClassName: 'text-white',
          }}
        >
          <div className="text-2xl font-bold">{props.page_data.fine}</div>
        </CardStat>
      </div>
      <Card>
        <CardHeader>
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
            <Input
              className="w-full sm:w-1/4"
              placeholder="Search..."
              value={params?.search}
              onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
            />
            <Select value={params?.load} onValueChange={(e) => setParams({ ...params, load: e })}>
              <SelectTrigger className="w-full sm:w-24">
                <SelectValue placeholder="Load" />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 75, 100].map((number, index) => (
                  <SelectItem key={index} value={number}>
                    {number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="red" onClick={() => setParams({ page: 1, load: 10, search: '' })} size="xl">
              <IconRefresh className={'size-4'} />
              Bersihkan
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 py-0 [&td]:whitespace-nowrap [&td]:px-6 [&th]:px-6">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('id')}>
                    #
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('return_book_code')}>
                    Kode Pengembalian
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('loan_code')}>
                    Kode Peminjaman
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('book_id')}>
                    Buku
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('status')}>
                    Status
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('loan_date')}>
                    Tanggal Peminjaman
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('due_date')}>
                    Batas Pengembalian
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('return_date')}>
                    Tanggal Pengembalian
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>Denda</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('created_at')}>
                    Dibuat Pada
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {return_books.map((return_book, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                  <TableCell>{return_book.return_book_code}</TableCell>
                  <TableCell>{return_book.loan.loan_code}</TableCell>
                  <TableCell>{return_book.book.title}</TableCell>
                  <TableCell>{return_book.status}</TableCell>
                  <TableCell>{return_book.loan.loan_date}</TableCell>
                  <TableCell>{return_book.loan.due_date}</TableCell>
                  <TableCell>{return_book.return_date}</TableCell>
                  <TableCell className="text-red-500">{formatToRupiah(return_book.fine)}</TableCell>
                  <TableCell>{return_book.return_book_check}</TableCell>
                  <TableCell>{return_book.created_at}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-1">
                      <Button variant="blue" asChild size="sm">
                        <Link
                          href={route('front.return-books.show', [return_book.return_book_code])}
                          onSuccess={(success) => {
                            const flash = flashMessage(success);
                            if (flash.message) toast[flash.type](flash.message);
                          }}
                        >
                          <IconEye className={'size-4'} />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
          <p className="mb-2 text-sm text-muted-foreground">
            Manampilkan <span className="font-medium text-orange-500"> {meta.from ?? 0}</span> dari {meta.total}{' '}
            pengembalian
          </p>
          <div className="overflow-x-auto">
            {meta.has_pages && (
              <Pagination>
                <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                  {meta.links.map((link, index) => (
                    <PaginationItem key={index} className="mx-1 mb-1 lg:mb-0">
                      <PaginationLink href={link.url} isActive={link.active}>
                        {link.label}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
