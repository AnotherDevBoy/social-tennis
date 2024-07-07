import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface LevelTabsProps {
  currentLevel: string;
  onChange: (level: string) => void;
}

const LevelTabs: React.FC<LevelTabsProps> = ({ currentLevel, onChange }) => {
  return (
    <Tabs
      value={currentLevel}
      onChange={(e, newValue) => onChange(newValue)}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Level A" value="A" />
      <Tab label="Level B" value="B" />
      <Tab label="Level C" value="C" />
    </Tabs>
  );
};

export default LevelTabs;
