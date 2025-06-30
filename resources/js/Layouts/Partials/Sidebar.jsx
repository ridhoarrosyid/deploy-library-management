import NavLink from '@/Components/NavLink';
import {
  IconBooks,
  IconBuildingCommunity,
  IconCategory,
  IconChartDots2,
  IconCircleKey,
  IconCreditCardPay,
  IconCreditCardRefund,
  IconDashboard,
  IconKeyframe,
  IconLayoutKanban,
  IconLogout,
  IconMoneybag,
  IconRoute,
  IconSettingsExclamation,
  IconStack3,
  IconUser,
  IconUsersGroup,
  IconVersions,
} from '@tabler/icons-react';

export default function Sidebar({ url, auth }) {
  return (
    <nav className="grid items-start px-2 text-sm font-semibold lg:p-4">
      <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
      <NavLink
        active={url.startsWith('/dashboard')}
        url={route('dashboard')}
        title={'Dashboard'}
        icon={IconDashboard}
      />
      <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
      <NavLink url="#" title={'Statistik Peminjaman'} icon={IconChartDots2} />
      <NavLink url="#" title={'Laporan Denda'} icon={IconMoneybag} />
      <NavLink url="#" title={'Laporan Stok Buku'} icon={IconStack3} />
      <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
      <NavLink url="#" title={'Kategori'} icon={IconCategory} />
      <NavLink url="#" title={'Penerbit'} icon={IconBuildingCommunity} />
      <NavLink url="#" title={'Buku'} icon={IconBooks} />
      <NavLink url="#" title={'Pengguna'} icon={IconUsersGroup} />
      <NavLink url="#" title={'Pengaturan Denda'} icon={IconSettingsExclamation} />
      <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran dan Izin</div>
      <NavLink url="#" title={'Peran'} icon={IconCircleKey} />
      <NavLink url="#" title={'Izin'} icon={IconVersions} />
      <NavLink url="#" title={'Tetapkan Peran'} icon={IconKeyframe} />
      <NavLink url="#" title={'Tetapkan Izin'} icon={IconLayoutKanban} />
      <NavLink url="#" title={'Akses Rute'} icon={IconRoute} />
      <div className="px-3 py-2 text-sm font-semibold text-foreground">Transaksi</div>
      <NavLink url="#" title={'Peminjaman'} icon={IconCreditCardPay} />
      <NavLink url="#" title={'Pengembalian'} icon={IconCreditCardRefund} />
      <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
      <NavLink url={route('profile.edit')} title={'Profile'} icon={IconUser} />
      <NavLink url={route('logout')} title={'Logout'} icon={IconLogout} method="post" as="button" className="w-full" />
    </nav>
  );
}
