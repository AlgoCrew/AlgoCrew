import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
  HiOutlineSquares2X2,
  HiOutlineDocumentChartBar,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiMiniServerStack,
  HiPuzzlePiece,
  HiUserGroup,
  HiOutlineCloud,
  HiCodeBracket,
  HiOutlineShoppingCart,
  HiMiniPhone,
  HiOutlineCurrencyDollar
} from "react-icons/hi2";

import {
  HiOutlineCollection
} from "react-icons/hi";

import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
  PiMailboxThin,
} from "react-icons/pi";
import { IoShareSocial } from "react-icons/io5";

import { FaDiscord, FaGithub, FaLinkedin, FaX, FaThreads, FaWordpressSimple, FaLocationDot } from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  squares: HiOutlineSquares2X2,
  documentChart: HiOutlineDocumentChartBar,
  shield: HiOutlineShieldCheck,
  bulb: HiOutlineLightBulb,
  server: HiMiniServerStack,
  game: HiPuzzlePiece,
  users: HiUserGroup,
  clouds: HiOutlineCloud,
  code: HiCodeBracket,
  cart: HiOutlineShoppingCart,
  mailBox: PiMailboxThin,
  phone: HiMiniPhone,
  dollar: HiOutlineCurrencyDollar,
  collections: HiOutlineCollection,
  wordPress: FaWordpressSimple,
  chevronLeft: IoChevronBackCircleOutline,
  chevronRight: IoChevronForwardCircleOutline,
  location: FaLocationDot,
  social: IoShareSocial,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;