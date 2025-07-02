import HeaderTitle from '@/Components/HeaderTitle';
import IconCategory from '@/Components/icons/IconCategory';
import IconPencil from '@/Components/icons/IconPencil';
import IconPlus from '@/Components/icons/IconPlus';
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
import { Card, CardContent } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Index(props) {
  return (
    <div className="flex w-full flex-col pb-32">
      <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle title={props.page_settings.title} subtitle={props.page_settings.subtitle} icon={IconCategory} />
        <Button variant="orange" size="lg" asChild>
          <Link href={route('admin.categories.create')}>
            <IconPlus className={'size-4'} />
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="px-0 py-0 [&td]:whitespace-nowrap [&td]:px-6 [&th]:px-6">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Cover</TableHead>
                <TableHead>Dibuat Pada</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.categories.map((category, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={category.cover} />
                      <AvatarFallback>{category.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{category.created_at}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-1">
                      <Button variant="blue" size="sm" asChild>
                        <Link href={route('admin.categories.edit', [category.id])}>
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
                            <AlertDialogCancel>Cancal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {}}>Hapus</AlertDialogAction>
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
      </Card>
    </div>
  );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
