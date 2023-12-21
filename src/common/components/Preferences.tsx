import React from 'react';
import { useUIPreferencesStore } from '~/common/state/store-ui';
import LanguageSelect from './LanguageSelect';

const Preferences = () => {
  const { selectedLanguage, setSelectedLanguage } = useUIPreferencesStore(state => ({ selectedLanguage: state.selectedLanguage, setSelectedLanguage: state.setSelectedLanguage }));

  return (
    <div>
      <LanguageSelect selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      {/* Rest of the Preferences component */}
    </div>
  );
};

export default Preferences;
