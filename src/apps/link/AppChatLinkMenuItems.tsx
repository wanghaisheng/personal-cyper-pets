import * as React from 'react';
import { shallow } from 'zustand/shallow';

import { MenuItem, Select, Switch, Typography } from '@mui/joy';
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
    preferredLanguage, setPreferredLanguage,
  } = useUIPreferencesStore(state => ({
    renderMarkdown: state.renderMarkdown, setRenderMarkdown: state.setRenderMarkdown,
    zenMode: state.zenMode, setZenMode: state.setZenMode,
    preferredLanguage: state.preferredLanguage, setPreferredLanguage: state.setPreferredLanguage,
  }), shallow);


  const handleRenderSystemMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => setShowSystemMessages(event.target.checked);
  const handleRenderMarkdownChange = (event: React.ChangeEvent<HTMLInputElement>) => setRenderMarkdown(event.target.checked);
  const handleZenModeChange = (event: React.ChangeEvent<HTMLInputElement>) => setZenMode(event.target.checked ? 'cleaner' : 'clean');

  const zenOn = zenMode === 'cleaner';


  return <>

    <MenuItem onClick={() => setShowSystemMessages(!showSystemMessages)} sx={{ justifyContent: 'space-between' }}>
      <Typography>
        System message
      </Typography>
      <Switch
        checked={showSystemMessages} onChange={handleRenderSystemMessageChange}
        // endDecorator={showSystemMessages ? 'On' : 'Off'}
        slotProps={{ endDecorator: { sx: { minWidth: 26 } } }}
      />
    </MenuItem>

    <MenuItem onClick={() => setRenderMarkdown(!renderMarkdown)} sx={{ justifyContent: 'space-between' }}>
      <Typography>
        Markdown
      </Typography>
      <Switch
        checked={renderMarkdown} onChange={handleRenderMarkdownChange}
        // endDecorator={renderMarkdown ? 'On' : 'Off'}
        slotProps={{ endDecorator: { sx: { minWidth: 26 } } }}
      />
    </MenuItem>

    <MenuItem onClick={() => setZenMode(zenOn ? 'clean' : 'cleaner')} sx={{ justifyContent: 'space-between' }}>
      <Typography>
        Zen
      </Typography>
      <Switch
        checked={zenOn} onChange={handleZenModeChange}
        // endDecorator={zenOn ? 'On' : 'Off'}
        slotProps={{ endDecorator: { sx: { minWidth: 26 } } }}
      />
    </MenuItem>

    <MenuItem sx={{ justifyContent: 'space-between' }}>
      <Typography>
        Language
      </Typography>
      <Select value={preferredLanguage} onChange={(event) => setPreferredLanguage(event.target.value)}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        {/* Add more languages as needed */}
      </Select>
    </MenuItem>

  </>;
}