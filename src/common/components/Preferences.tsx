import React from 'react';
import { useUIPreferencesStore } from '~/common/state/store-ui';
import LanguageSelect from './LanguageSelect';

const Preferences = () => {
  const { preferredLanguage, setPreferredLanguage } = useUIPreferencesStore(state => ({ preferredLanguage: state.preferredLanguage, setPreferredLanguage: state.setPreferredLanguage }));

  return (
    <div>
      <LanguageSelect preferredLanguage={preferredLanguage} setPreferredLanguage={setPreferredLanguage} />
      {/* Rest of the Preferences component */}
    </div>
  );
};

export default Preferences;
