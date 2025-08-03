import CardStat from '@/Components/CardStat';
import HeaderTitle from '@/Components/HeaderTitle';
import IconArrowUpRight from '@/Components/icons/IconArrowUpRight';
import IconBooks from '@/Components/icons/IconBooks';
import IconCreditCardPay from '@/Components/icons/IconCreditCardPay';
import IconCreditCardRefund from '@/Components/icons/IconCreditCardRefund';
import IconDashboard from '@/Components/icons/IconDashboard';
import IconMoneybag from '@/Components/icons/IconMoneybag';
import IconUsersGroup from '@/Components/icons/IconUsersGroup';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard(props) {
  const auth = props.auth.user;
  return (
    <div className="flex w-full flex-col space-y-4 pb-32">
      <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <HeaderTitle title={props.page_settings.title} subtitle={props.page_settings.subtitle} icon={IconDashboard} />
      </div>
      {auth.role.some((role) => ['operator', 'admin'].includes(role)) && (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <CardStat
            data={{
              title: 'Total Buku',
              icon: IconBooks,
              background: 'text-white bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400',
              iconClassName: 'text-white',
            }}
          >
            <div className="text-2xl font-bold"> {props.page_data.total_books} </div>
          </CardStat>
          <CardStat
            data={{
              title: 'Total Pengguna',
              icon: IconUsersGroup,
              background: 'text-white bg-gradient-to-r from-purple-400 via-purple-400 to-purple-400',
              iconClassName: 'text-white',
            }}
          >
            <div className="text-2xl font-bold">{props.page_data.total_users}</div>
          </CardStat>
          <CardStat
            data={{
              title: 'Peminjaman',
              icon: IconCreditCardPay,
              background: 'text-white bg-gradient-to-r from-rose-400 via-rose-400 to-rose-400',
              iconClassName: 'text-white',
            }}
          >
            <div className="text-2xl font-bold">{props.page_data.total_loans}</div>
          </CardStat>
          <CardStat
            data={{
              title: 'Pengembalian',
              icon: IconCreditCardRefund,
              background: 'text-white bg-gradient-to-r from-lime-400 via-lime-400 to-lime-400',
              iconClassName: 'text-white',
            }}
          >
            <div className="text-2xl font-bold">{props.page_data.total_returns}</div>
          </CardStat>
        </div>
      )}
      {auth.role.some((role) => ['member'].includes(role)) && (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <CardStat
            data={{
              title: 'Total Peminjaman',
              icon: IconCreditCardPay,
              background: 'text-white bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400',
              iconClassName: 'text-white',
            }}
          >
            <div className="text-2xl font-bold">{props.page_data.total_loans}</div>
          </CardStat>
          <CardStat
            data={{
              title: 'Total Pengembalian',
              icon: IconCreditCardRefund,
              background: 'text-white bg-gradient-to-r from-purple-400 via-purple-400 to-purple-400',
              iconClassName: 'text-white',
            }}
          >
            <div className="text-2xl font-bold">{props.page_data.total_returns}</div>
          </CardStat>
          <CardStat
            data={{
              title: 'Denda',
              icon: IconMoneybag,
              background: 'text-white bg-gradient-to-r from-rose-400 via-rose-400 to-rose-400',
              iconClassName: 'text-white',
            }}
          >
            <div className="text-2xl font-bold">{props.page_data.total_fines}</div>
          </CardStat>
        </div>
      )}

      <div className="flex w-full flex-col justify-between gap-2 lg:flex-row">
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-y-2">
                <CardTitle>Transaksi Peminjaman</CardTitle>
                <CardDescription>Anda dapat melihat 5 transaksi peminjaman terakhir</CardDescription>
              </div>
              <Button variant="orange" asChild>
                {auth.role.some((role) => ['operator', 'admin'].includes(role)) ? (
                  <Link href={route('admin.loans.index')}>
                    {' '}
                    Lihat Semua
                    <IconArrowUpRight className={'size-4'} />
                  </Link>
                ) : (
                  <Link href={'#'}>
                    Lihat Semua <IconArrowUpRight className={'size-4'} />
                  </Link>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Kode Peminjaman</TableHead>
                  <TableHead>Buku</TableHead>
                  <TableHead>Member</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.page_data.loans.map((loan, index) => (
                  <TableRow key={index}>
                    <TableCell> {index + 1} </TableCell>
                    <TableCell> {loan.loan_code} </TableCell>
                    <TableCell> {loan.book.title} </TableCell>
                    <TableCell> {loan.user.name} </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="w-full lg:w-1/2">
          <CardHeader>
            <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-y-2">
                <CardTitle>Transaksi Pengembalian</CardTitle>
                <CardDescription>Anda dapat melihat 5 transaksi pengembalian terakhir</CardDescription>
              </div>
              <Button variant="orange" asChild>
                {auth.role.some((role) => ['operator', 'admin'].includes(role)) ? (
                  <Link href={route('admin.return-books.index')}>
                    Lihat Semua
                    <IconArrowUpRight className={'size-4'} />
                  </Link>
                ) : (
                  <Link href={'#'}>
                    Lihat Semua <IconArrowUpRight className={'size-4'} />
                  </Link>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Kode Pengembalian</TableHead>
                  <TableHead>Buku</TableHead>
                  <TableHead>Member</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.page_data.return_books.map((returnBook, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{returnBook.return_book_code}</TableCell>
                    <TableCell>{returnBook.book.title}</TableCell>
                    <TableCell>{returnBook.user.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Dashboard.layout = (page) => <AppLayout title={'Dashboard'} children={page} />;
