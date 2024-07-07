export type Player = { name: string; gender: string };
export type Pairing = { id: number; player1: Player; player2: Player | null };
export type Pairings = { [key in 'A' | 'B' | 'C']: Pairing[] };

export const generateRandomName = () => {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Frank', 'Grace', 'Hank', 'Ivy'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Evans', 'Green', 'Harris', 'Irving', 'Jackson'];
  const genders = ['Male', 'Female'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const gender = genders[Math.floor(Math.random() * genders.length)];
  return { name: `${firstName} ${lastName}`, gender };
};

export const generatePairings = (count: number) => {
  const pairings: Pairing[] = [];
  for (let i = 0; i < count; i++) {
    pairings.push({ id: i, player1: generateRandomName(), player2: generateRandomName() });
  }
  return pairings;
};

export const shuffleArray = (array: any[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const shuffleByGender = (pairings: Pairing[]) => {
  const males: Player[] = [];
  const females: Player[] = [];

  pairings.forEach(pairing => {
    if (pairing.player1.gender === 'Male') {
      males.push(pairing.player1);
    } else {
      females.push(pairing.player1);
    }

    if (pairing.player2) {
      if (pairing.player2.gender === 'Male') {
        males.push(pairing.player2);
      } else {
        females.push(pairing.player2);
      }
    }
  });

  const shuffledPairings: Pairing[] = [];
  const maxPairs = Math.min(males.length, females.length);

  for (let i = 0; i < maxPairs; i++) {
    shuffledPairings.push({
      id: i,
      player1: males[i],
      player2: females[i],
    });
  }

  // Add remaining unpaired players
  const remainingMales = males.slice(maxPairs);
  const remainingFemales = females.slice(maxPairs);

  let remainingId = maxPairs;
  remainingMales.forEach(male => {
    shuffledPairings.push({ id: remainingId++, player1: male, player2: null });
  });
  remainingFemales.forEach(female => {
    shuffledPairings.push({ id: remainingId++, player1: female, player2: null });
  });

  return shuffledPairings;
};
