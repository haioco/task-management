// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import GroupIcon from '@mui/icons-material/Group'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'صفحه اصلی',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'پروژه ها  ',
      icon: AutoAwesomeMosaicIcon,
      path: '/project'
    },
    {
      title: 'فعالیت ها ',
      icon: AssignmentIcon,
      path: '/task',
      children: [
        {
          title: 'فعالیت های من ',
          path: '/task/list/'
        },
        {
          title: 'فعالیت جدید  ',
          path: '/task/'
        },
      ]
    },
    {
      title: 'لیست کاربران',
      icon: GroupIcon,
      path: '/users',
      children: [
        {
          title: 'کاربر جدید',
          path: '/users/create'
        },
        {
          title: ' لیست کاربران',
          path: '/users'
        }
      ]
    },
    {
      title: 'صفحه دوم ',
      icon: EmailOutline,
      path: '/second-page'
    },

    {
      title: 'تست سطح دسترسی ',
      icon: ShieldOutline,
      path: '/acl',
      action: 'read',
      subject: 'acl-page'
    },
    {
      title: ' تست منو ',
      icon: ShieldOutline,
      path: '/handle',
      action: 'read',
      subject: 'handle-page'
    },
    {
      title: 'create permission',
      icon: ShieldOutline,
      path: '/handle/create',
      action: 'read',
      subject: 'create-page'
    }
  ]
}

export default navigation
