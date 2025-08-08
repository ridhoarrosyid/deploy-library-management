import ApplicationLogo from '@/Components/ApplicationLogo';
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
import NavLinkResponsive from '@/Components/NavLinkResponsive';

export default function SidebarResponsive({ url, auth }) {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <ApplicationLogo />
      <nav className="grid items-start text-sm font-semibold lg:p-4">
        {auth.role.some((role) => ['member', 'operator', 'admin'].includes(role)) && (
          <>
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
            <NavLinkResponsive
              active={url.startsWith('/dashboard')}
              url={route('dashboard')}
              title={'Dashboard'}
              icon={IconDashboard}
            />
          </>
        )}

        {auth.role.some((role) => ['admin'].includes(role)) && (
          <>
            <div className="px-3 py-2 text-sm font-semibold text-foreground">Statistik</div>
            <NavLinkResponsive
              url={route('admin.loan-statistics.index')}
              active={url.startsWith('/admin/loan-statistics')}
              title={'Statistik Peminjaman'}
              icon={IconChartDots2}
            />
            <NavLinkResponsive
              url={route('admin.fine-reports.index')}
              active={url.startsWith('/admin/fine-reports')}
              title={'Laporan Denda'}
              icon={IconMoneybag}
            />
            <NavLinkResponsive
              url={route('admin.book-stock-reports.index')}
              active={url.startsWith('admin/book-stock-reports')}
              title={'Laporan Stok Buku'}
              icon={IconStack3}
            />
          </>
        )}

        {auth.role.some((role) => ['admin', 'operator'].includes(role)) && (
          <>
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
              active={url.startsWith('/admin/books')}
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
          </>
        )}

        {auth.role.some((role) => ['admin'].includes(role)) && (
          <>
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
            <NavLinkResponsive
              url={route('admin.route-accesses.index')}
              active={url.startsWith('/admin/route-accesses')}
              title={'Akses Rute'}
              icon={IconRoute}
            />
          </>
        )}

        {auth.role.some((role) => ['admin', 'operator'].includes(role)) && (
          <>
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
          </>
        )}

        {auth.role.some((role) => ['member'].includes(role)) && (
          <>
            <NavLinkResponsive
              url={route('front.books.index')}
              active={url.startsWith('/books')}
              title={'Buku'}
              icon={IconBooks}
            />
            <NavLinkResponsive
              url={route('front.categories.index')}
              active={url.startsWith('/categories')}
              title={'Kategori'}
              icon={IconCategory}
            />
            <NavLinkResponsive
              url={route('front.loans.index')}
              active={url.startsWith('/loans')}
              title={'Peminjaman'}
              icon={IconCreditCardPay}
            />
            <NavLinkResponsive
              url={route('front.return-books.index')}
              active={url.startsWith('/return-books')}
              title={'Pengembalian'}
              icon={IconCreditCardRefund}
            />
            <NavLinkResponsive url="#" active={url.startsWith('/fines')} title={'Denda'} icon={IconMoneybag} />
          </>
        )}

        <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
        {auth.role.some((role) => ['admin', 'operator'].includes(role)) && (
          <>
            <NavLinkResponsive
              url={route('admin.announcements.index')}
              active={url.startsWith('/admin/announcements')}
              title={'Pengumuman'}
              icon={IconAlertCircle}
            />
          </>
        )}

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
