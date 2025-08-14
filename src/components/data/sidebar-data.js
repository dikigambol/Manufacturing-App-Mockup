import {
  IconAirTrafficControl,
  IconBox,
  IconBrandDatabricks,
  // IconBarrierBlock,
  IconBrowserCheck, IconChartBar, IconChecklist, IconDashboard, IconDeviceHeartMonitor, IconEngine, // IconBug,
  // IconChecklist,
  // IconError404,
  // IconHelp,
  IconLayoutDashboard, // IconLock,
  // IconLockAccess,
  // IconMessages,
  IconNotification, // IconPackages,
  IconPalette, // IconServerOff,
  IconSettings,
  IconSettings2,
  IconTool,
  IconUserCog, // IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'

export const sidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'PT. Shadcn',
      logo: Command,
      plan: 'Startup',
    },
    {
      name: 'PT. Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'PT. Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Data Resources',
          url: '/data-resources',
          icon: IconBrandDatabricks,
        },
        {
          title: 'Dashboard',
          url: '/',
          id_dash: 1,
          icon: IconLayoutDashboard,
        },
        {
          title: 'Informasi Produksi',
          url: '/inf-prod',
          id_dash: 2,
          icon: IconChecklist,
        },
        {
          title: 'Monitoring Line',
          url: '/mon-line',
          id_dash: 3,
          icon: IconDeviceHeartMonitor,
        },
        {
          title: 'Quality Control',
          url: '/qc',
          id_dash: 4,
          icon: IconAirTrafficControl,
        },
        {
          title: 'Material & Inventory',
          url: '/mater-inv',
          id_dash: 5,
          icon: IconBox,
        },
        {
          title: 'Maintenance',
          url: '/mainten',
          id_dash: 6,
          icon: IconSettings2,
        },
        {
          title: 'Safety & Compliance',
          url: '/saf-comp',
          id_dash: 7,
          icon: IconUserCog,
        },
        {
          title: 'Energy & Efficiency',
          url: '/enrg-effcy',
          id_dash: 8,
          icon: IconEngine,
        },
        {
          title: 'Operator Performance',
          url: '/opp-perf',
          id_dash: 9,
          icon: IconDashboard,
        }
      ]
    },
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Auth',
    //       icon: IconLockAccess,
    //       items: [
    //         {
    //           title: 'Sign In',
    //           url: '/sign-in',
    //         },
    //         {
    //           title: 'Sign In (2 Col)',
    //           url: '/sign-in-2',
    //         },
    //         {
    //           title: 'Sign Up',
    //           url: '/sign-up',
    //         },
    //         {
    //           title: 'Forgot Password',
    //           url: '/forgot-password',
    //         },
    //         {
    //           title: 'OTP',
    //           url: '/otp',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Errors',
    //       icon: IconBug,
    //       items: [
    //         {
    //           title: 'Unauthorized',
    //           url: '/401',
    //           icon: IconLock,
    //         },
    //         {
    //           title: 'Forbidden',
    //           url: '/403',
    //           icon: IconUserOff,
    //         },
    //         {
    //           title: 'Not Found',
    //           url: '/404',
    //           icon: IconError404,
    //         },
    //         {
    //           title: 'Internal Server Error',
    //           url: '/500',
    //           icon: IconServerOff,
    //         },
    //         {
    //           title: 'Maintenance Error',
    //           url: '/503',
    //           icon: IconBarrierBlock,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Other',
    //   items: [
    //     {
    //       title: 'Settings',
    //       icon: IconSettings,
    //       items: [
    //         {
    //           title: 'Profile',
    //           url: '/settings',
    //           icon: IconUserCog,
    //         },
    //         {
    //           title: 'Account',
    //           url: '/settings/account',
    //           icon: IconTool,
    //         },
    //         {
    //           title: 'Appearance',
    //           url: '/settings/appearance',
    //           icon: IconPalette,
    //         },
    //         {
    //           title: 'Notifications',
    //           url: '/settings/notifications',
    //           icon: IconNotification,
    //         },
    //         {
    //           title: 'Display',
    //           url: '/settings/display',
    //           icon: IconBrowserCheck,
    //         },
    //       ],
    //     },
    //     // {
    //     //   title: 'Help Center',
    //     //   url: '/help-center',
    //     //   icon: IconHelp,
    //     // },
    //   ],
    // },
  ],
}