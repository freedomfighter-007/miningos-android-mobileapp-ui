/**
 * iOS Module Exports
 */

// Main App
export { IOSApp } from './iOSApp'

// Theme
export { iOS_COLOR, iOS_GRADIENTS, iOSDarkTheme, IOSGlobalStyle } from './Theme'
export type { iOSTheme, iOSColorKey, iOSGradientKey } from './Theme'

// Components
export {
  TabBar,
  NavigationBar,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  StatCard,
  List,
  ListItem,
  ListItemToggle,
  ListItemValue,
  Button,
  IconButton,
  StatusBadge,
  StatusDotOnly,
  MinerCard,
  MinerRow,
  SimpleLineChart,
  Sparkline,
} from './Components'
export type { TabItem, StatusType } from './Components'

// Views
export { Dashboard, Miners, Alerts, Settings } from './Views'

// Router
export { getiOSRouter, iOS_ROUTES } from './router/iOSRouter'

// Layout
export { IOSLayout } from './Layout/iOSLayout'
