import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowDownUp from '@/Components/icons/IconArrowDownUp';
import IconCreditCardRefund from '@/Components/icons/IconCreditCardRefund';
import IconEye from '@/Components/icons/IconEye';
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
import Approve from './Approve';

export default function Index(props) {
  const { data: return_books, meta } = props.return_books;
  const [params, setParams] = useState(props.state);

  const onSortable = (field) => {
    setParams({ ...params, field: field, direction: params.direction === 'asc' ? 'desc' : 'asc' });
  };

  useFilter({ route: route('admin.return-books.index'), values: params, only: ['return_books'] });
  return (
    <div className="flex w-full flex-col pb-32">
      <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle
          title={props.page_settings.title}
          subtitle={props.page_settings.subtitle}
          icon={IconCreditCardRefund}
        />
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
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('return_book_code')}>
                    Kode Pengembalian
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('loan_code')}>
                    Kode Peminjaman
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('user_id')}>
                    Nama
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('book_id')}>
                    Buku
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('status')}>
                    Status
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('loan_date')}>
                    Tanggal Peminjaman
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('due_date')}>
                    Batas Pengembalian
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
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
                  {' '}
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

                  <TableCell>{return_book.user.name}</TableCell>
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
                      {return_book.fine && (
                        <Button variant="blue" asChild size="sm">
                          <Link
                            href={route('admin.fines.create', [return_book])}
                            onSuccess={(success) => {
                              const flash = flashMessage(success);
                              if (flash.message) toast[flash.type](flash.message);
                            }}
                          >
                            <IconEye className={'size-4'} />
                          </Link>
                        </Button>
                      )}
                      {return_book.status === 'Pengecekan' && (
                        <Approve
                          conditions={props.conditions}
                          action={route('admin.return-books.approve', [return_book])}
                        />
                      )}
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
