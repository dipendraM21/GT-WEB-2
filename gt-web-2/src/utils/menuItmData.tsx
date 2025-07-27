import fareIcon from "@/../public/svg/fare-icon.svg";
import { appRoutes } from "@/utils/routes";
import { translation } from "@/utils/translation";
import Image from "next/image";
import { FaReceipt, FaTachometerAlt, FaUserMd } from "react-icons/fa";

// Icon wrapper for SVGs
const FareIcon = () => (
  <Image width={20} height={20} src={fareIcon} alt="fare-icon" />
);

export const menuItems = [
  {
    title: translation?.DASHBOARD,
    url: appRoutes?.dashboard,
    icon: FaTachometerAlt,
    isActive: false,
    items: [],
  },
  {
    title: translation?.USER_MANAGEMENT,
    url: "#",
    icon: FaUserMd,
    isActive: false,
    items: [
      {
        title: translation?.USER_LIST,
        url: appRoutes?.userRequests,
      },
    ],
  },
  {
    title: translation?.FARE_MANAGEMANT,
    url: "#",
    icon: FareIcon,
    isActive: false,
    items: [
      {
        title: translation?.COUPON_MANAGEMENT,
        url: appRoutes?.surfCoupons,
      },
      {
        title: translation?.MARKUP_MANAGEMENT,
        url: appRoutes?.markupManagement,
      },
    ],
  },
  {
    title: translation?.ACCOUNTING,
    url: "#",
    icon: FaTachometerAlt,
    isActive: false,
    items: [
      {
        title: translation?.BOOKING_MANAGEMENT,
        url: appRoutes?.bookingManagement,
      },
      {
        title: translation?.MY_BOOKINGS,
        url: appRoutes?.myBookings,
      },
      {
        title: translation?.LEDGER_MANAGEMENT,
        url: appRoutes?.ledgerManagement,
      },
    ],
  },
  {
    title: translation?.QUEUES_MANAGEMENT,
    url: "#",
    icon: FaReceipt,
    isActive: false,
    items: [
      {
        title: translation?.CANCELLATION_QUEUES,
        url: appRoutes?.cancellationQueuesManagement,
      },
      {
        title: translation?.RESCHEDULE_QUEUES,
        url: appRoutes?.rescheduleQueuesManagement,
      },
      {
        title: translation?.HOLD_QUEUES,
        url: appRoutes?.holdQueuesManagement,
      },
    ],
  },
  {
    title: translation?.TRANSACTION_MANAGEMENT,
    url: "#",
    icon: FaReceipt,
    isActive: false,
    items: [
      {
        title: translation?.TRANSACTION_LIST,
        url: appRoutes?.transactionManagement,
      },
    ],
  },
];
