import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowDownUp from '@/Components/icons/IconArrowDownUp';
import IconCreditCardPay from '@/Components/icons/IconCreditCardPay';
import IconEye from '@/Components/icons/IconEye';
import IconRefresh from '@/Components/icons/IconRefresh';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { useFilter } from '@/Pages/hooks/useFilter';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index(props) {
  const { data: loans, meta } = props.loans;
  const [params, setParams] = useState(props.state);

  const onSortable = (field) => {
    setParams({ ...params, field: field, direction: params.direction === 'asc' ? 'desc' : 'asc' });
  };

  useFilter({ route: route('front.loans.index'), values: params, only: ['loans'] });
  return (
    <div className="flex w-full flex-col pb-32">
      <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle
          title={props.page_settings.title}
          subtitle={props.page_settings.subtitle}
          icon={IconCreditCardPay}
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
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('loan_code')}>
                    Kode Peminjaman
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
              {loans.map((loan, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                  <TableCell>{loan.loan_code}</TableCell>

                  <TableCell>{loan.book.title}</TableCell>
                  <TableCell>{loan.loan_date}</TableCell>
                  <TableCell>{loan.due_date}</TableCell>

                  <TableCell>{loan.created_at}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-1">
                      <Button variant="blue" size="sm" asChild>
                        <Link href={route('front.loans.show', [loan.loan_code])}>
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
            peminjaman
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
