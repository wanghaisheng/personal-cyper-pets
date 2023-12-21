import * as React from 'react';
import { shallow } from 'zustand/shallow';

import { MenuItem, Select, Switch, Typography } from '@mui/joy';
import locales from '../../locales/en.json';
import { useUIPreferencesStore } from '~/common/state/store-ui';

import { useChatShowSystemMessages } from '../chat/store-app-chat';


/**
 * Menu Items are the settings for the chat.
 */
export function AppChatLinkMenuItems() {

  // external state
  const [showSystemMessages, setShowSystemMessages] = useChatShowSystemMessages();
  const {
    renderMarkdown, setRenderMarkdown,
    zenMode, setZenMode,
    selectedLanguage, setSelectedLanguage,
  } = useUIPreferencesStore(state => ({
    renderMarkdown: state.renderMarkdown, setRenderMarkdown: state.setRenderMarkdown,
    zenMode: state.zenMode, setZenMode: state.setZenMode,
    selectedLanguage: state.selectedLanguage, setSelectedLanguage: state.setSelectedLanguage,
  }), shallow);


  const handleRenderSystemMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => setShowSystemMessages(event.target.checked);
  const handleRenderMarkdownChange = (event: React.ChangeEvent<HTMLInputElement>) => setRenderMarkdown(event.target.checked);
  const handleZenModeChange = (event: React.ChangeEvent<HTMLInputElement>) => setZenMode(event.target.checked ? 'cleaner' : 'clean');

  const zenOn = zenMode === 'cleaner';


  return <>

    <MenuItem onClick={(event) => {
  if (!event) return;
  setShowSystemMessages(!showSystemMessages);
}} sx={{ justifyContent: 'space-between' }}>
      <Typography>
        {locales.system_message}
      </Typography>
      <Switch
        checked={showSystemMessages} onChange={handleRenderSystemMessageChange}
        // endDecorator={showSystemMessages ? 'On' : 'Off'}
        slotProps={{ endDecorator: { sx: { minWidth: 26 } } }}
      />
    </MenuItem>

    <MenuItem onClick={(event) => {
  if (!event) return;
  setRenderMarkdown(!renderMarkdown);
}} sx={{ justifyContent: 'space-between' }}>
      <Typography>
        {locales.markdown}
      </Typography>
      <Switch
        checked={renderMarkdown} onChange={handleRenderMarkdownChange}
        // endDecorator={renderMarkdown ? 'On' : 'Off'}
        slotProps={{ endDecorator: { sx: { minWidth: 26 } } }}
      />
    </MenuItem>

    <MenuItem onClick={(event) => {
  if (!event) return;
  setZenMode(zenOn ? 'clean' : 'cleaner');
}} sx={{ justifyContent: 'space-between' }}>
      <Typography>
        {locales.zen}
      </Typography>
      <Switch
        checked={zenOn} onChange={handleZenModeChange}
        // endDecorator={zenOn ? 'On' : 'Off'}
        slotProps={{ endDecorator: { sx: { minWidth: 26 } } }}
      />
    </MenuItem>

    <MenuItem sx={{ justifyContent: 'space-between' }}>
      <Typography>
        {locales.language}
      </Typography>
      <Select value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        {/* Add more languages as needed */}
      </Select>
    </MenuItem>

  </>;
}