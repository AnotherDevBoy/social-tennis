import React, { useState } from 'react';
import {
  Container, Tabs, Tab, Box, Fab, Dialog, AppBar, Toolbar, IconButton, Typography, Button, Select, MenuItem, FormControl, InputLabel, Divider
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { faker } from '@faker-js/faker';

interface Score {
  id: number;
  pairing: string;
  wins: number;
  losses: number;
}

const FloatingButton = styled(Fab)({
  position: 'fixed',
  bottom: 16,
  right: 16,
});

const columns: GridColDef[] = [
  { field: 'pairing', headerName: 'Pairing', flex: 1 },
  { field: 'wins', headerName: 'Wins', flex: 1 },
  { field: 'losses', headerName: 'Losses', flex: 1 },
];

const generateRandomScores = (numScores: number): Score[] => {
  const scores: Score[] = [];
  for (let i = 0; i < numScores; i++) {
    const name1 = faker.name.fullName();
    const name2 = faker.name.fullName();
    scores.push({
      id: i,
      pairing: `${name1} & ${name2}`,
      wins: faker.datatype.number({ min: 0, max: 10 }),
      losses: faker.datatype.number({ min: 0, max: 10 }),
    });
  }
  return scores;
};

const TabPanel = ({ children, value, index }: { children: React.ReactNode, value: number, index: number }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ScoresPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [scoresA, setScoresA] = useState<Score[]>(generateRandomScores(10));
  const [scoresB, setScoresB] = useState<Score[]>(generateRandomScores(10));
  const [scoresC, setScoresC] = useState<Score[]>(generateRandomScores(10));
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    // Handle save logic here
    setDialogOpen(false);
  };

  return (
    <Container>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
          <Tab label="Level A" />
          <Tab label="Level B" />
          <Tab label="Level C" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box height={400}>
            <DataGrid
              rows={scoresA}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pagination
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'wins', sort: 'desc' }],
                },
              }}
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box height={400}>
            <DataGrid
              rows={scoresB}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pagination
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'wins', sort: 'desc' }],
                },
              }}
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box height={400}>
            <DataGrid
              rows={scoresC}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pagination
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'wins', sort: 'desc' }],
                },
              }}
            />
          </Box>
        </TabPanel>
      </Box>
      <FloatingButton color="primary" aria-label="add" onClick={handleOpenDialog}>
        <AddIcon />
      </FloatingButton>
      <Dialog fullScreen open={dialogOpen} onClose={handleCloseDialog}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              Scores
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box p={3}>
          {['Set 1', 'Set 2', 'Set 3'].map((set, index) => (
            <Box key={index} mb={3}>
              <Typography variant="h6">{set}</Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Score</InputLabel>
                <Select>
                  {[...Array(8)].map((_, num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Score</InputLabel>
                <Select>
                  {[...Array(8)].map((_, num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {index < 2 && <Divider />}
            </Box>
          ))}
        </Box>
      </Dialog>
    </Container>
  );
};

export default ScoresPage;
