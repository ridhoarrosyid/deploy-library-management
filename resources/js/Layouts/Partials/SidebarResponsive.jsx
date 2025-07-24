import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLinkResponsive from '@/Components/NavLinkResponsive';
import IconAlertCircle from '@/Components/icons/IconAlertCircle';
import IconBooks from '@/Components/icons/IconBooks';
import IconBuildingCommunity from '@/Components/icons/IconBuildingCommunity';
import IconCategory from '@/Components/icons/IconCategory';
import IconChartDots2 from '@/Components/icons/IconChartDots2';
import IconCircleKey from '@/Components/icons/IconCircleKey';
import IconCreditCardPay from '@/Components/icons/IconCreditCardPay';
import IconCreditCardRefund from '@/Components/icons/IconCreditCardRefund';
import IconDashboard from '@/Components/icons/IconDashboard';
import IconKeyframe from '@/Components/icons/IconKeyframe';
import IconLayoutKanban from '@/Components/icons/IconLayoutKanban';
import IconLogout from '@/Components/icons/IconLogout';
import IconMoneybag from '@/Components/icons/IconMoneybag';
import IconRoute from '@/Components/icons/IconRoute';
import IconSettingsExclamation from '@/Components/icons/IconSettingsExclamation';
import IconStack3 from '@/Components/icons/IconStack3';
import IconUser from '@/Components/icons/IconUser';
import IconUsersGroup from '@/Components/icons/IconUsersGroup';
import IconVersions from '@/Components/icons/IconVersions';

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
        <NavLinkResponsive
          url={route('admin.categories.index')}
          active={url.startsWith('/admin/categories')}
          title={'Kategori'}
          icon={IconCategory}
        />
        <NavLinkResponsive
          url={route('admin.publishers.index')}
          active={url.startsWith('/admin/publishers')}
          title={'Penerbit'}
          icon={IconBuildingCommunity}
        />
        <NavLinkResponsive
          url={route('admin.books.index')}
          active={url.startWith('/admin/books')}
          title={'Buku'}
          icon={IconBooks}
        />
        <NavLinkResponsive
          url={route('admin.users.index')}
          active={url.startsWith('/admin.users')}
          title={'Pengguna'}
          icon={IconUsersGroup}
        />

        <NavLinkResponsive
          url={route('admin.fine-settings.create')}
          active={url.startsWith('/admin/fine-settings')}
          title={'Pengaturan Denda'}
          icon={IconSettingsExclamation}
        />
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran dan Izin</div>
        <NavLinkResponsive
          url={route('admin.roles.index')}
          active={url.startsWith('/admin/roles')}
          title={'Peran'}
          icon={IconCircleKey}
        />
        <NavLinkResponsive
          url={route('admin.permissions.index')}
          active={url.startsWith('/admin/permissions')}
          title={'Izin'}
          icon={IconVersions}
        />
        <NavLinkResponsive
          url={route('admin.assign-permissions.index')}
          active={url.startsWith('/admin/assign-permissions')}
          title={'Tetapkan Izin'}
          icon={IconKeyframe}
        />
        <NavLinkResponsive
          url={route('admin.assign-users.index')}
          active={url.startsWith('/admin/assign-users')}
          title={'Tetapkan Peran'}
          icon={IconLayoutKanban}
        />
        <NavLinkResponsive url="#" title={'Akses Rute'} icon={IconRoute} />
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Transaksi</div>
        <NavLinkResponsive
          url={route('admin.loans.index')}
          active={url.startsWith('/admin/loans')}
          title={'Peminjaman'}
          icon={IconCreditCardPay}
        />
        <NavLinkResponsive
          url={route('admin.return-books.index')}
          active={url.startsWith('/admin/return-books')}
          title={'Pengembalian'}
          icon={IconCreditCardRefund}
        />
        <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>

        <NavLinkResponsive
          url={route('admin.announcements.index')}
          active={url.startsWith('/admin/announcements')}
          title={'Pengumuman'}
          icon={IconAlertCircle}
        />
        <NavLinkResponsive
          url={route('profile.edit')}
          active={url.startsWith('/admin/profile')}
          title={'Profile'}
          icon={IconUser}
        />
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
