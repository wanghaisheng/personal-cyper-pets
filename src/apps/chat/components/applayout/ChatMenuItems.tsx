import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, ListDivider, ListItemDecorator, MenuItem, Switch } from '@mui/joy';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import CompressIcon from '@mui/icons-material/Compress';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import type { DConversationId } from '~/common/state/store-chats';
import { KeyStroke } from '~/common/components/KeyStroke';
import { closeLayoutMenu } from '~/common/layout/store-applayout';
import { useUICounter } from '~/common/state/store-ui';
import { getDictionary, getLocales } from '../../../../i18n/langHelper';

import { useChatShowSystemMessages } from '../../store-app-chat';

const languages = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'es',
    name: 'Spanish',
  },
  {
    code: 'fr',
    name: 'French',
  },
];

// const languages=getLocales()
export function ChatMenuItems(props: {
  conversationId: DConversationId | null,
  hasConversations: boolean,
  isConversationEmpty: boolean,
  isMessageSelectionMode: boolean,
  setIsMessageSelectionMode: (isMessageSelectionMode: boolean) => void,
  onConversationBranch: (conversationId: DConversationId, messageId: string | null) => void,
  onConversationClear: (conversationId: DConversationId) => void,
  onConversationExport: (conversationId: DConversationId | null) => void,
  onConversationFlatten: (conversationId: DConversationId) => void,
}) {

  const { t, i18n } = useTranslation();

  // external state
  const { touch: shareTouch } = useUICounter('export-share');
  const [showSystemMessages, setShowSystemMessages] = useChatShowSystemMessages();

  // derived state
  const disabled = !props.conversationId || props.isConversationEmpty;

  const closeMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    closeLayoutMenu();
  };

  const handleConversationClear = (event: React.MouseEvent<HTMLDivElement>) => {
    closeMenu(event);
    props.conversationId && props.onConversationClear(props.conversationId);
  };

  const handleConversationBranch = (event: React.MouseEvent<HTMLDivElement>) => {
    closeMenu(event);
    props.conversationId && props.onConversationBranch(props.conversationId, null);
  };

  const handleConversationExport = (event: React.MouseEvent<HTMLDivElement>) => {
    closeMenu(event);
    props.onConversationExport(!disabled ? props.conversationId : null);
    shareTouch();
  };

  const handleConversationFlatten = (event: React.MouseEvent<HTMLDivElement>) => {
    closeMenu(event);
    props.conversationId && props.onConversationFlatten(props.conversationId);
  };

  const handleToggleMessageSelectionMode = (event: React.MouseEvent) => {
    closeMenu(event);
    props.setIsMessageSelectionMode(!props.isMessageSelectionMode);
  };

  const handleToggleSystemMessages = () => setShowSystemMessages(!showSystemMessages);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  return <>
    {/*<ListItem>*/}
    {/*  <Typography level='body-sm'>*/}
    {/*    Conversation*/}
    {/*  </Typography>*/}
    {/*</ListItem>*/}
    <MenuItem>
      <ListItemDecorator><SettingsSuggestIcon /></ListItemDecorator>
      {t('Conversation')}
    </MenuItem>

    <MenuItem onClick={handleToggleSystemMessages}>
      <ListItemDecorator><SettingsSuggestIcon /></ListItemDecorator>
      {t('System message')}
      <Switch checked={showSystemMessages} onChange={handleToggleSystemMessages} sx='auto' />
    </MenuItem>

    <ListDivider inset='startContent' />

    <MenuItem disabled={disabled} onClick={handleConversationBranch}>
      <ListItemDecorator><ForkRightIcon /></ListItemDecorator>
      {t('Branch')}
    </MenuItem>

    <MenuItem disabled={disabled} onClick={handleConversationFlatten}>
      <ListItemDecorator><CompressIcon color='success' /></ListItemDecorator>
      {t('Flatten')}
    </MenuItem>

    <ListDivider inset='startContent' />

    <MenuItem disabled={!props.hasConversations} onClick={handleConversationExport}>
      <ListItemDecorator>
        <FileDownloadIcon />
      </ListItemDecorator>
      {t('Share / Export ...')}
    </MenuItem>


    <MenuItem disabled={disabled} onClick={handleConversationClear}>
      <ListItemDecorator><ClearIcon /></ListItemDecorator>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        Reset
        {!disabled && <KeyStroke combo='Ctrl + Alt + X' />}
      </Box>
    </MenuItem>

    <ListDivider inset='startContent' />

    <MenuItem>
      <ListItemDecorator><SettingsSuggestIcon /></ListItemDecorator>
      {t('Language')}
      <select onChange={handleLanguageChange} value={i18n.language}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </MenuItem>
    </>;

}
