export const ELECTION_STEPS = [
  {
    id: 'registration',
    title: 'Voter Registration',
    description: 'The first step to participating in a democracy is ensuring you are registered to vote.',
    details: [
      'Eligibility: 18+ years old on the qualifying date.',
      'Form 6: For new registration.',
      'Required Docs: ID proof, Address proof, Photo.',
      'Portal: Use NVSP (National Voters\' Service Portal) or Voter Helpline App.'
    ],
    icon: 'UserPlus',
    color: '#ff9933'
  },
  {
    id: 'nominations',
    title: 'Candidate Nominations',
    description: 'Candidates file their nominations to contest in the elections.',
    details: [
      'Filing: Candidates submit nomination papers to the Returning Officer.',
      'Scrutiny: Election officials verify the papers.',
      'Withdrawal: Candidates have a window to withdraw their nomination.',
      'Symbols: Allocation of election symbols to candidates.'
    ],
    icon: 'FileText',
    color: '#ffffff'
  },
  {
    id: 'campaigning',
    title: 'Election Campaigning',
    description: 'Candidates and parties reach out to voters with their vision.',
    details: [
      'Duration: Ends 48 hours before polling starts.',
      'MCC: Model Code of Conduct comes into effect.',
      'Rallies: Subject to permission and noise regulations.',
      'Manifestos: Parties release their promises to the public.'
    ],
    icon: 'Megaphone',
    color: '#138808'
  },
  {
    id: 'polling',
    title: 'Polling Day',
    description: 'Citizens cast their votes at designated polling stations.',
    details: [
      'EVM & VVPAT: Electronic Voting Machines and Voter Verifiable Paper Audit Trail.',
      'Identification: Use EPIC (Voter ID) or other approved ID cards.',
      'Procedure: Inked finger, button press on EVM, verify slip in VVPAT.',
      'Sealing: Machines are sealed and transported to secure strong rooms.'
    ],
    icon: 'CheckSquare',
    color: '#4f46e5'
  },
  {
    id: 'counting',
    title: 'Counting & Results',
    description: 'The final stage where votes are counted and results are declared.',
    details: [
      'Counting Centers: Secure locations with CCTV and observers.',
      'Procedure: Round-wise counting of EVM votes and Postal ballots.',
      'Declaration: Returning Officer declares the winner.',
      'Gazette Notification: Final results published officially.'
    ],
    icon: 'BarChart',
    color: '#ec4899'
  }
];
