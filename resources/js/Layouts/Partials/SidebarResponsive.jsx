import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLinkResponsive from '@/Components/NavLinkResponsive';
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

export default function SidebarResponsive({ url, auth }) {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <ApplicationLogo />
      <nav className="grid items-start text-sm font-semibold lg:p-4">
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
        <NavLinkResponsive
          active={url.startsWith('/dashboard')}
          url={route('dashboard')}
          title={'Dashboard'}
          icon={IconDashboard}
        />
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
        <NavLinkResponsive url="#" title={'Statistik Peminjaman'} icon={IconChartDots2} />
        <NavLinkResponsive url="#" title={'Laporan Denda'} icon={IconMoneybag} />
        <NavLinkResponsive url="#" title={'Laporan Stok Buku'} icon={IconStack3} />
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
        <NavLinkResponsive url="#" title={'Kategori'} icon={IconCategory} />
        <NavLinkResponsive url="#" title={'Penerbit'} icon={IconBuildingCommunity} />
        <NavLinkResponsive url="#" title={'Buku'} icon={IconBooks} />
        <NavLinkResponsive url="#" title={'Pengguna'} icon={IconUsersGroup} />
        <NavLinkResponsive url="#" title={'Pengaturan Denda'} icon={IconSettingsExclamation} />
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran dan Izin</div>
        <NavLinkResponsive url="#" title={'Peran'} icon={IconCircleKey} />
        <NavLinkResponsive url="#" title={'Izin'} icon={IconVersions} />
        <NavLinkResponsive url="#" title={'Tetapkan Peran'} icon={IconKeyframe} />
        <NavLinkResponsive url="#" title={'Tetapkan Izin'} icon={IconLayoutKanban} />
        <NavLinkResponsive url="#" title={'Akses Rute'} icon={IconRoute} />
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Transaksi</div>
        <NavLinkResponsive url="#" title={'Peminjaman'} icon={IconCreditCardPay} />
        <NavLinkResponsive url="#" title={'Pengembalian'} icon={IconCreditCardRefund} />
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
        <NavLinkResponsive url={route('profile.edit')} title={'Profile'} icon={IconUser} />
        <NavLinkResponsive
          url={route('logout')}
          title={'Logout'}
          icon={IconLogout}
          method="post"
          as="button"
          className="w-full"
        />
      </nav>
    </nav>
  );
}
