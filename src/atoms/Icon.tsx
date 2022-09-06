import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import DotsIcon from '@assets/icons/dots.svg';
import EditIcon from '@assets/icons/edit.svg';
import HomeIcon from '@assets/icons/home.svg';
import LinkIcon from '@assets/icons/link.svg';
import PlusIcon from '@assets/icons/plus.svg';
import UserIcon from '@assets/icons/user.svg';
import BrandIcon from '@assets/icons/brand.svg';
import BriefIcon from '@assets/icons/brief.svg';
import BriefsFlattenedIcon from '@assets/icons/briefs-flattened.svg';
import CheckIcon from '@assets/icons/check.svg';
import CloseIcon from '@assets/icons/close.svg';
import SlackIcon from '@assets/icons/slack.svg';
import TrashIcon from '@assets/icons/trash.svg';
import UsersIcon from '@assets/icons/users.svg';
import ExpandIcon from '@assets/icons/expand.svg';
import CreatorIcon from '@assets/icons/creator.svg';
import NetworkIcon from '@assets/icons/network.svg';
import CalendarIcon from '@assets/icons/calendar.svg';
import ProjectsIcon from '@assets/icons/projects.svg';
import ProjectsFlattenedIcon from '@assets/icons/projects-flattened.svg';
import PDFIcon from '@assets/icons/file-pdf.svg';
import UploadIcon from '@assets/icons/upload.svg';
import ArrowNeIcon from '@assets/icons/arrow-ne.svg';
import DownloadIcon from '@assets/icons/download.svg';
import ArrowLeftIcon from '@assets/icons/arrow-left.svg';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';
import ChevronLeftIcon from '@assets/icons/chevron-left.svg';
import ConstructionIcon from '@assets/icons/construction.svg';
import ChevronRightIcon from '@assets/icons/chevron-right.svg';
import AnnouncementIcon from '@assets/icons/announcement.svg';
import BookmarkActiveIcon from '@assets/icons/bookmark-active.svg';
import BookmarkInactiveIcon from '@assets/icons/bookmark-inactive.svg';
import CircleArrowLeftIcon from '@assets/icons/circle-arrow-left.svg';
import CircleArrowRightIcon from '@assets/icons/circle-arrow-right.svg';
import PictureIcon from '@assets/icons/picture.svg';
import BoxedDownloadIcon from '@assets/icons/boxed-download.svg';
import BookmarkedImageIcon from '@assets/icons/bookmarked-image.svg';
import MoveIcon from '@assets/icons/move.svg';
import AddCollectionIcon from '@assets/icons/add-collection.svg';
import AddToCollectionIcon from '@assets/icons/add-to-collection.svg';
import RemoveFromCollectionIcon from '@assets/icons/remove-from-collection.svg';
import VerticalDotsIcon from '@assets/icons/vertical-dots.svg';
import ErrorIcon from '@assets/icons/validation-error.svg';
import SuccessIcon from '@assets/icons/validation-success.svg';
import LightbulbIcon from '@assets/icons/lightbulb.svg';
import DragIcon from '@assets/icons/drag.svg';
import FileIcon from '@assets/icons/file.svg';

const ArrowRightIcon = styled(ArrowLeftIcon)`
  transform: rotate(180deg);
`;

// TODO: fix `any`
const ICONS: { [key: string]: any } = {
  pdf: PDFIcon,
  dots: DotsIcon,
  edit: EditIcon,
  file: FileIcon,
  home: HomeIcon,
  link: LinkIcon,
  plus: PlusIcon,
  user: UserIcon,
  users: UsersIcon,
  brief: BriefIcon,
  brand: BrandIcon,
  check: CheckIcon,
  close: CloseIcon,
  error: ErrorIcon,
  trash: TrashIcon,
  slack: SlackIcon,
  upload: UploadIcon,
  expand: ExpandIcon,
  creator: CreatorIcon,
  network: NetworkIcon,
  picture: PictureIcon,
  success: SuccessIcon,
  calendar: CalendarIcon,
  projects: ProjectsIcon,
  download: DownloadIcon,
  construction: ConstructionIcon,
  announcement: AnnouncementIcon,
  'arrow-ne': ArrowNeIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'bookmark-active': BookmarkActiveIcon,
  'bookmark-inactive': BookmarkInactiveIcon,
  'circle-arrow-left': CircleArrowLeftIcon,
  'circle-arrow-right': CircleArrowRightIcon,
  'boxed-download': BoxedDownloadIcon,
  'bookmarked-image': BookmarkedImageIcon,
  move: MoveIcon,
  'add-collection': AddCollectionIcon,
  'add-to-collection': AddToCollectionIcon,
  'remove-from-collection': RemoveFromCollectionIcon,
  'vertical-dots': VerticalDotsIcon,
  'briefs-flattened': BriefsFlattenedIcon,
  'projects-flattened': ProjectsFlattenedIcon,
  drag: DragIcon,
  // called differently than used
  idea: LightbulbIcon,
  next: ArrowRightIcon,
  previous: ArrowLeftIcon,
};

type IIconProps = {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
};

export function Icon({ icon, size, color, ...props }: IIconProps): JSX.Element {
  const Component = useMemo(() => ICONS[icon], [icon]);

  return <Component style={{ color, width: size, height: size }} {...props} />;
}

Icon.defaultProps = {
  size: 16,
  color: 'var(--brand-bubble)',
  className: undefined,
};
