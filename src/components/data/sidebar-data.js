import {
  IconAirTrafficControl,
  IconBox,
  IconBrandDatabricks,
  IconBrowserCheck,
  IconChartBar,
  IconChecklist,
  IconDashboard,
  IconDeviceHeartMonitor,
  IconEngine,
  IconLayoutDashboard,
  IconNotification,
  IconPalette,
  IconSettings,
  IconSettings2,
  IconTool,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react'
import {
  Factory,
  BarChart3,
  Database,
  Settings,
  Wrench,
  Shield,
  Zap,
  Users as UsersIcon,
  TrendingUp,
  Package
} from 'lucide-react'

// Get sidebar data based on active line
export const getSidebarData = (lineId) => {
  // Base user data
  const baseData = {
    user: {
      name: 'Production Manager',
      email: 'manager@manufacturing.com',
      avatar: '/avatars/user.jpg',
    },
    teams: [
      {
        name: 'Manufacturing Co.',
        logo: Factory,
        plan: 'Enterprise',
      },
    ],
  };

  // Line-specific navigation
  const lineNavGroups = {
    line_1: [
      {
        title: 'Line 1 - Dashboard',
        items: [
          {
            title: 'Overview',
            url: '/dashboard/line_1',
            id_dash: 1,
            icon: BarChart3,
          },
          {
            title: 'Production Monitoring',
            url: '/dashboard/production',
            id_dash: 5,
            icon: Factory,
          },
          {
            title: 'Machine Status',
            url: '/dashboard/machines',
            id_dash: 6,
            icon: TrendingUp,
          },
        ]
      },
      {
        title: 'Analytics',
        items: [
          {
            title: 'Quality Control',
            url: '/dashboard/qc',
            id_dash: 7,
            icon: Shield,
          },
          {
            title: 'Material & Inventory',
            url: '/dashboard/inventory',
            id_dash: 8,
            icon: Package,
          },
          {
            title: 'Maintenance',
            url: '/dashboard/maintenance',
            id_dash: 9,
            icon: Wrench,
          },
          {
            title: 'Energy & Efficiency',
            url: '/dashboard/energy',
            id_dash: 10,
            icon: Zap,
          },
          {
            title: 'Operator Performance',
            url: '/dashboard/operators',
            id_dash: 11,
            icon: UsersIcon,
          }
        ]
      },
      {
        title: 'Management',
        items: [
          {
            title: 'Data Resources',
            url: '/data-resources',
            icon: Database,
          },
          {
            title: 'Settings',
            url: '/settings',
            icon: Settings,
          },
        ]
      },
    ],
    line_2: [
      {
        title: 'Line 2 - Dashboard',
        items: [
          {
            title: 'Overview',
            url: '/dashboard/line_2',
            id_dash: 2,
            icon: BarChart3,
          },
          {
            title: 'Production Monitoring',
            url: '/dashboard/production',
            id_dash: 5,
            icon: Factory,
          },
          {
            title: 'Machine Status',
            url: '/dashboard/machines',
            id_dash: 6,
            icon: TrendingUp,
          },
        ]
      },
      {
        title: 'Analytics',
        items: [
          {
            title: 'Quality Control',
            url: '/dashboard/qc',
            id_dash: 7,
            icon: Shield,
          },
          {
            title: 'Material & Inventory',
            url: '/dashboard/inventory',
            id_dash: 8,
            icon: Package,
          },
          {
            title: 'Maintenance',
            url: '/dashboard/maintenance',
            id_dash: 9,
            icon: Wrench,
          },
          {
            title: 'Energy & Efficiency',
            url: '/dashboard/energy',
            id_dash: 10,
            icon: Zap,
          },
          {
            title: 'Operator Performance',
            url: '/dashboard/operators',
            id_dash: 11,
            icon: UsersIcon,
          }
        ]
      },
      {
        title: 'Management',
        items: [
          {
            title: 'Data Resources',
            url: '/data-resources',
            icon: Database,
          },
          {
            title: 'Settings',
            url: '/settings',
            icon: Settings,
          },
        ]
      },
    ],
    line_3: [
      {
        title: 'Line 3 - Dashboard',
        items: [
          {
            title: 'Overview',
            url: '/dashboard/line_3',
            id_dash: 3,
            icon: BarChart3,
          },
          {
            title: 'Production Monitoring',
            url: '/dashboard/production',
            id_dash: 5,
            icon: Factory,
          },
          {
            title: 'Machine Status',
            url: '/dashboard/machines',
            id_dash: 6,
            icon: TrendingUp,
          },
        ]
      },
      {
        title: 'Analytics',
        items: [
          {
            title: 'Quality Control',
            url: '/dashboard/qc',
            id_dash: 7,
            icon: Shield,
          },
          {
            title: 'Material & Inventory',
            url: '/dashboard/inventory',
            id_dash: 8,
            icon: Package,
          },
          {
            title: 'Maintenance',
            url: '/dashboard/maintenance',
            id_dash: 9,
            icon: Wrench,
          },
          {
            title: 'Energy & Efficiency',
            url: '/dashboard/energy',
            id_dash: 10,
            icon: Zap,
          },
          {
            title: 'Operator Performance',
            url: '/dashboard/operators',
            id_dash: 11,
            icon: UsersIcon,
          }
        ]
      },
      {
        title: 'Management',
        items: [
          {
            title: 'Data Resources',
            url: '/data-resources',
            icon: Database,
          },
          {
            title: 'Settings',
            url: '/settings',
            icon: Settings,
          },
        ]
      },
    ],
  };

  // Default navigation for non-line pages
  const defaultNavGroups = [
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Overview',
          url: '/dashboard/overview',
          id_dash: 4,
          icon: BarChart3,
        },
      ]
    },
    {
      title: 'Management',
      items: [
        {
          title: 'Data Resources',
          url: '/data-resources',
          icon: Database,
        },
      ]
    },
  ];

  // Return appropriate navigation based on lineId
  return {
    ...baseData,
    navGroups: lineNavGroups[lineId] || defaultNavGroups
  };
};

// Legacy export for backward compatibility
export const sidebarData = getSidebarData('line_1');