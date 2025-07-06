import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowDownUp from '@/Components/icons/IconArrowDownUp';
import IconBooks from '@/Components/icons/IconBooks';
import IconPencil from '@/Components/icons/IconPencil';
import IconPlus from '@/Components/icons/IconPlus';
import IconRefresh from '@/Components/icons/IconRefresh';
import IconTrash from '@/Components/icons/IconTrash';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useFilter } from '@/Pages/hooks/useFilter';
import { Link, router } from '@inertiajs/react';

import { useState } from 'react';
import { toast } from 'sonner';

export default function Index(props) {
  const { data: books, meta } = props.books;
  const [params, setParams] = useState(props.state);

  const onSortable = (field) => {
    setParams({ ...params, field: field, direction: params.direction === 'asc' ? 'desc' : 'asc' });
  };

  useFilter({ route: route('admin.books.index'), values: params, only: ['books'] });
  return (
    <div className="flex w-full flex-col pb-32">
      <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle title={props.page_settings.title} subtitle={props.page_settings.subtitle} icon={IconBooks} />
        <Button variant="orange" size="lg" asChild>
          <Link href={route('admin.books.create')}>
            <IconPlus className={'size-4'} />
          </Link>
        </Button>
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
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('book_code')}>
                    Kode Buku
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('title')}>
                    Judul
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('author')}>
                    Penulis
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('publication_year')}>
                    Tahun Publikasi
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('isbn')}>
                    ISBN
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('language')}>
                    Bahasa
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('number_of_pages')}>
                    Jumlah Halaman
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
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('price')}>
                    Harga
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>Cover</TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('category_id')}>
                    Kategori
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('publisher_id')}>
                    Penerbit
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>
                <TableHead>
                  {' '}
                  <Button className="group inline-flex" variant="ghost" onClick={() => onSortable('created_at')}>
                    Dibuat pada
                    <span className="ml-2 flex-none rounded text-muted-foreground">
                      <IconArrowDownUp className="size-4 text-muted-foreground" />
                    </span>
                  </Button>
                </TableHead>

                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                  <TableCell>{book.book_code}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.stock.total}</TableCell>
                  <TableCell>{book.publication_year}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.language}</TableCell>
                  <TableCell>{book.number_of_pages}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={book.cover} />
                      <AvatarFallback> {book.title.substring(0, 1)} </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{book.category.name}</TableCell>
                  <TableCell>{book.publisher.name}</TableCell>
                  <TableCell>{book.created_at}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-1">
                      <Button variant="blue" size="sm" asChild>
                        <Link href={route('admin.books.edit', [book.id])}>
                          <IconPencil className={'size-4'} />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="red" size="sm">
                            <IconTrash className={'size-4'} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Apakah Anda benar-benar yakin?!</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus data secara permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                router.delete(route('admin.books.destroy', [book]), {
                                  preserveScroll: true,
                                  preserveState: true,
                                  onSuccess: (success) => {
                                    const flash = flashMessage(success);
                                    if (flash) toast[flash.type](flash.message);
                                  },
                                })
                              }
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
          <p className="mb-2 text-sm text-muted-foreground">
            Manampilkan <span className="font-medium text-orange-500"> {meta.from ?? 0}</span> dari {meta.total} Buku
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
