import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ScoresDialog from './ScoresDialog';
import LevelTabs from './LevelTabs';

interface Score {
  level: string;
  id: number;
  players: string;
  wins: number;
 losses: number;
}

interface ScoresListProps {
  scores: Score[];
  setScores: React.Dispatch<React.SetStateAction<Score[]>>;
  currentLevel: string;
  setCurrentLevel: React.Dispatch<React.SetStateAction<string>>;
}

const ScoresList: React.FC<ScoresListProps> = ({ scores, setScores, currentLevel, setCurrentLevel }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const handleAddClick = () => {
    setDialogOpen(true);
  };

  const handleSave = (newScores: number[][]) => {
    const newScore = {
      level: currentLevel,
      id: scores.length ? scores[scores.length - 1].id + 1 : 1,
      players: 'New Player Pairing', // Adjust as necessary
      wins: newScores.reduce((acc, score) => acc + score[0], 0), // Sum of wins
      losses: newScores.reduce((acc, score) => acc + score[1], 0), // Sum of losses
    };
    setScores([...scores, newScore]);
    setDialogOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'players', headerName: 'Players', flex: 1 },
    { field: 'wins', headerName: 'Wins', type: 'number', flex: 1 },
    { field: 'losses', headerName: 'Losses', type: 'number', flex: 1 },
  ];

  return (
    <Box>
      <Container>
        <Box mt={4}>
          <LevelTabs currentLevel={currentLevel} onChange={setCurrentLevel} />
          <DataGrid
            rows={scores.filter(score => score.level === currentLevel)}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            autoHeight
            pageSizeOptions={[5]}
          />
        </Box>
      </Container>
      <Fab
        color="primary"
        onClick={handleAddClick}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <ScoresDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default ScoresList;
