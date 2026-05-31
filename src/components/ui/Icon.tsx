'use client';

import React from 'react';
import {
  Landmark,
  Activity,
  Calculator,
  Lightbulb,
  GraduationCap,
  Settings,
  Shield,
  Clock,
  FlaskConical,
  ArrowLeftRight,
  Percent,
  Equal,
  Variable,
  AlertCircle,
  Hash,
  Code,
  BarChart2,
  Table,
  Dices,
  Type,
  Circle,
  Infinity as InfinityIcon,
  Sprout,
  FileText,
  FileCheck,
  Coins,
  TrendingUp,
  PiggyBank,
  Lock,
  Home,
  Car,
  Scale,
  Flame,
  Send,
  DollarSign,
  UserCheck,
  Handshake,
  CreditCard,
  Briefcase,
  Target,
  Trophy,
  Baby,
  User,
  CalendarCheck,
  Receipt,
  Leaf,
  Umbrella,
  Accessibility,
  Footprints,
  Plane,
  Gauge,
  Utensils,
  Timer,
  BatteryCharging,
  Apple,
  GitFork,
  Box,
  Globe,
  Radio,
  Thermometer,
  Building,
  Grid,
  Paintbrush,
  ListTodo,
  Truck,
  Layers,
  Waves,
  Map,
  Sun,
  FileEdit,
  BookOpen,
  Medal,
  Keyboard,
  SpellCheck,
  RotateCcw,
  Laptop,
  MapPin,
  Dumbbell,
  Droplet,
  ClipboardCheck,
  Award,
  Sparkles,
  Calendar,
  Battery,
  Snowflake,
  Ruler,
  Bolt,
  Maximize2,
  ShoppingCart,
  Repeat,
  Hourglass,
  Wifi,
  Newspaper,
  Menu,
  Search,
  Moon,
  ChevronRight,
  ChevronDown,
  Recycle,
  CloudRain,
  X,
  Bug,
  MessageCircle,
  CheckCircle2,
  Star,
  Heart,
  Copy,
  Download,
  Share2,
  Link2,
  Printer,
  ThumbsDown,
  ThumbsUp,
  Frown,
  Meh,
  Smile,
  PartyPopper,
  Info,
  AlertTriangle,
  CircleAlert,
  Crosshair,
  Utensils as UtensilsIcon,
  Zap,
  ArrowLeft,
  Mail,
  Trash2,
  History,
  Eraser,
  FileSignature,
  Cookie,
  HeartPulse,
  Cake,
  PieChart,
  CigaretteOff,
  Syringe,
  IndianRupee,
  HardDrive,
  Compass,
  Cpu,
  Volume2,
  Fuel,
  Shirt,
  Hospital,
  Bed,
  Book,
  Tags,
  Plug,
  Image,
  Tag,
  Square,
  GlassWater,
  AtSign,
  RotateCw,
  ArrowRight,
  Check,
  List,
  Flag,
  ExternalLink,
  GitBranch,
  ArrowUp,
  GitMerge
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  // Navigation & General
  'fa-house': Home,
  'fa-chart-line': TrendingUp,
  'fa-newspaper': Newspaper,
  'fa-bars': Menu,
  'fa-search': Search,
  'fa-moon': Moon,
  'fa-sun': Sun,
  'fa-chevron-right': ChevronRight,
  'fa-chevron-down': ChevronDown,

  // Categories
  'fa-landmark': Landmark,
  'fa-heartbeat': Activity,
  'fa-calculator': Calculator,
  'fa-lightbulb': Lightbulb,
  'fa-graduation-cap': GraduationCap,
  'fa-gear': Settings,
  'fa-helmet-safety': Shield, // Map to Shield since HardHat is not default
  'fa-clock': Clock,
  'fa-flask': FlaskConical,
  'fa-right-left': ArrowLeftRight,

  // Specific Calculator Icons
  'fa-percent': Percent,
  'fa-equals': Equal,
  'fa-square-root-variable': Variable,
  'fa-wave-square': Activity,
  'fa-exclamation': AlertCircle,
  'fa-superscript': Type,
  'fa-hashtag': Hash,
  'fa-code': Code,
  'fa-chart-simple': BarChart2,
  'fa-chart-column': BarChart2,
  'fa-table-cells': Table,
  'fa-dice': Dices,
  'fa-divide': Percent,
  'fa-i-cursor': Type,
  'fa-draw-polygon': Box,
  'fa-circle': Circle,
  'fa-infinity': InfinityIcon,
  'fa-building-columns': Landmark,
  'fa-seedling': Sprout,
  'fa-file-invoice': FileText,
  'fa-file-invoice-dollar': FileCheck,
  'fa-file-lines': FileText,
  'fa-coins': Coins,
  'fa-arrow-trend-up': TrendingUp,
  'fa-piggy-bank': PiggyBank,
  'fa-vault': Lock,
  'fa-car': Car,
  'fa-scale-balanced': Scale,
  'fa-fire-flame-curved': Flame,
  'fa-money-bill-transfer': Send,
  'fa-sack-dollar': DollarSign,
  'fa-user-shield': UserCheck,
  'fa-handshake': Handshake,
  'fa-house-chimney': Home,
  'fa-credit-card': CreditCard,
  'fa-scale-unbalanced-flip': Scale,
  'fa-briefcase': Briefcase,
  'fa-arrow-up-right-dots': TrendingUp,
  'fa-house-circle-check': Home,
  'fa-stairs': TrendingUp,
  'fa-bullseye': Target,
  'fa-trophy': Trophy,
  'fa-child': Baby,
  'fa-user-tie': User,
  'fa-calendar-check': CalendarCheck,
  'fa-receipt': Receipt,
  'fa-code-compare': ArrowLeftRight,
  'fa-leaf': Leaf,
  'fa-stamp': Shield,
  'fa-umbrella': Umbrella,
  'fa-chart-candlestick': BarChart2,
  'fa-person-cane': Accessibility,
  'fa-weight-scale': Scale,
  'fa-paw': Footprints,
  'fa-plane-departure': Plane,
  'fa-gauge-high': Gauge,
  'fa-kitchen-set': Utensils,
  'fa-shoe-prints': Footprints,
  'fa-stopwatch': Timer,
  'fa-charging-station': BatteryCharging,
  'fa-person-running': Activity,
  'fa-apple-whole': Apple,
  'fa-circle-nodes': GitFork,
  'fa-cube': Box,
  'fa-flask-vial': FlaskConical,
  'fa-earth-americas': Globe,
  'fa-radiation': Radio,
  'fa-satellite': Plane,
  'fa-temperature-arrow-up': Thermometer,
  'fa-gauge-simple-high': Gauge,
  'fa-building': Building,
  'fa-border-all': Grid,
  'fa-paint-roller': Paintbrush,
  'fa-grip': Grid,
  'fa-bars-progress': ListTodo,
  'fa-tractor': Truck,
  'fa-layer-group': Layers,
  'fa-water': Waves,
  'fa-map': Map,
  'fa-solar-panel': Sun,
  'fa-file-pen': FileEdit,
  'fa-book-open': BookOpen,
  'fa-medal': Medal,
  'fa-book-open-reader': BookOpen,
  'fa-keyboard': Keyboard,
  'fa-spell-check': SpellCheck,
  'fa-fire': Flame,
  'fa-money-bill-wave': DollarSign,
  'fa-shield-halved': Shield,
  'fa-car-side': Car,
  'fa-rotate': RotateCcw,
  'fa-chart-gantt': BarChart2,
  'fa-money-bill-trend-up': TrendingUp,
  'fa-dice-d20': Dices,
  'fa-laptop-code': Laptop,
  'fa-house-lock': Lock,
  'fa-map-location-dot': MapPin,
  'fa-dumbbell': Dumbbell,
  'fa-person-arrow-up-from-line': TrendingUp,
  'fa-lungs': Activity,
  'fa-utensils': Utensils,
  'fa-glass-water-droplet': Droplet,
  'fa-clipboard-check': ClipboardCheck,
  'fa-ranking-star': Award,
  'fa-crystal-ball': Sparkles,
  'fa-calendar-days': Calendar,
  'fa-car-battery': Battery,
  'fa-snowflake': Snowflake,
  'fa-ruler-combined': Ruler,
  'fa-faucet-drip': Droplet,
  'fa-bolt': Bolt,
  'fa-temperature-half': Thermometer,
  'fa-compress': Maximize2,
  'fa-gears': Settings,
  'fa-cubes-stacked': Layers,
  'fa-recycle': Recycle,
  'fa-cloud-rain': CloudRain,
  'fa-cart-shopping': ShoppingCart,
  'fa-repeat': Repeat,
  'fa-chart-bar': BarChart2,
  'fa-calendar-day': Calendar,
  'fa-house-user': Home,
  'fa-ruler-vertical': Ruler,
  'fa-hourglass-half': Hourglass,
  'fa-wifi': Wifi,
  // New icons for emoji replacement
  'fa-xmark': X,
  'fa-x': X,
  'fa-bug': Bug,
  'fa-comment': MessageCircle,
  'fa-message': MessageCircle,
  'fa-circle-check': CheckCircle2,
  'fa-check-circle': CheckCircle2,
  'fa-star': Star,
  'fa-heart': Heart,
  'fa-copy': Copy,
  'fa-download': Download,
  'fa-share': Share2,
  'fa-link': Link2,
  'fa-print': Printer,
  'fa-thumbs-down': ThumbsDown,
  'fa-thumbs-up': ThumbsUp,
  'fa-frown': Frown,
  'fa-meh': Meh,
  'fa-smile': Smile,
  'fa-party-popper': PartyPopper,
  'fa-info-circle': Info,
  'fa-info': Info,
  'fa-triangle-exclamation': AlertTriangle,
  'fa-warning': AlertTriangle,
  'fa-circle-exclamation': CircleAlert,
  'fa-crosshair': Crosshair,
  'fa-utensils-alt': UtensilsIcon,
  'fa-zap': Zap,

  // New Missing Actions & Navigation Mappings
  'fa-arrow-left': ArrowLeft,
  'fa-envelope': Mail,
  'fa-location-dot': MapPin,
  'fa-paper-plane': Send,
  'fa-trash-can': Trash2,
  'fa-clock-rotate-left': History,
  'fa-eraser': Eraser,
  'fa-file-signature': FileSignature,
  'fa-circle-question': HelpCircleIcon,
  'fa-readme': BookOpen,
  'fa-lock': Lock,
  'fa-redo': RotateCcw,
  'fa-cookie-bite': Cookie,
  'fa-magnifying-glass-chart': BarChart2,
  
  // New Calculator Domain Mappings
  'fa-hand-holding-dollar': Coins,
  'fa-droplet': Droplet,
  'fa-heart-pulse': HeartPulse,
  'fa-birthday-cake': Cake,
  'fa-chart-pie': PieChart,
  'fa-baby': Baby,
  'fa-weight-hanging': Scale,
  'fa-calendar-heart': CalendarCheck,
  'fa-wine-glass': GlassWater,
  'fa-ruler-horizontal': Ruler,
  'fa-user-check': UserCheck,
  'fa-person': User,
  'fa-ban-smoking': CigaretteOff,
  'fa-child-reaching': Accessibility,
  'fa-syringe': Syringe,
  'fa-person-dots-from-line': TrendingUp,
  'fa-heart-circle-check': Heart,
  'fa-ruler': Ruler,
  'fa-vector-square': Square,
  'fa-indian-rupee-sign': IndianRupee,
  'fa-hard-drive': HardDrive,
  'fa-drafting-compass': Compass,
  'fa-globe': Globe,
  'fa-cake-candles': Cake,
  'fa-bolt-lightning': Zap,
  'fa-microchip': Cpu,
  'fa-plug-circle-bolt': Zap,
  'fa-battery-half': Battery,
  'fa-volume-high': Volume2,
  'fa-tower-broadcast': Radio,
  'fa-tag': Tag,
  'fa-gas-pump': Fuel,
  'fa-house-flag': Home,
  'fa-plug': Plug,
  'fa-image': Image,
  'fa-house-circle-xmark': Home,
  'fa-shirt': Shirt,
  'fa-ring': Coins,

  // New Interpretation & Alert Mappings
  'fa-sparkles': Sparkles,
  'fa-file-certificate': Award,
  'fa-umbrella-beach': Umbrella,
  'fa-hospital': Hospital,
  'fa-calendar': Calendar,
  'fa-running': Activity,
  'fa-bed': Bed,
  'fa-book': Book,
  'fa-hand-holding-heart': Heart,
  'fa-tags': Tags,
  'fa-user': User,
  'fa-at': AtSign,

  // Missing mappings identified
  'fa-rotate-right': RotateCw,
  'fa-magnifying-glass': Search,
  'fa-arrow-right': ArrowRight,
  'fa-arrows-split-up-and-left': GitMerge,
  'fa-circle-info': Info,
  'fa-list-check': ListTodo,
  'fa-check': Check,
  'fa-list': List,
  'fa-flag': Flag,
  'fa-exclamation-triangle': AlertTriangle,
  'fa-up-right-from-square': ExternalLink,
  'fa-code-branch': GitBranch,
  'fa-arrow-up': ArrowUp,
  'fa-share-nodes': Share2,

  // Social & Brand Custom Icons
  'fa-whatsapp': WhatsAppIcon,
  'fa-telegram': TelegramIcon,
  'fa-x-twitter': XTwitterIcon,
  'fa-linkedin': LinkedInIcon,
};

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, className, style }: IconProps) {
  // Strip fas/far/fab prefix and potential extra classes
  const cleanName = name
    .replace(/^(fas|far|fab|fa)\s+/, '')
    .trim()
    .split(/\s+/)[0];

  const LucideIcon = iconMap[cleanName] || iconMap[`fa-${cleanName}`] || HelpCircleIcon;

  return <LucideIcon className={className} style={style} />;
}

// Fallback icon
function HelpCircleIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// Social & Brand Icon Definitions
function WhatsAppIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.96-.75 3.78-1.64 6.3-2.73 7.55-3.26 3.6-1.5 4.34-1.76 4.83-1.77.11 0 .35.03.5.15.13.1.17.24.18.35-.01.07-.01.15-.02.22z" />
    </svg>
  );
}

function XTwitterIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: '1em', height: '1em', ...style }}
    >
      <path d="M20 24h-4v-7.25c0-1.724-.035-3.945-2.404-3.945-2.407 0-2.775 1.88-2.775 3.82V24H6.817V9.262h3.998V11.3h.057c.557-1.055 1.916-2.167 3.948-2.167 4.223 0 5.002 2.779 5.002 6.395V24zM3.82 7.029a2.327 2.327 0 11.002-4.654 2.327 2.327 0 01-.002 4.654zM5.819 24H1.82V9.262h3.999V24z" />
    </svg>
  );
}
