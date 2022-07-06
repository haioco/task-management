// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'

// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'صفحه اصلی',
    icon: HomeOutline,
    path: '/home'
  },
  {
    title: 'صفحه دوم ',
    icon: EmailOutline,
    path: '/second-page'
  },
  {
    title: ' سطح دسترسی',
    icon: ShieldOutline,
    path: '/acl',
    action: 'read',
    subject: 'acl-page'
  }
]

export default navigation
