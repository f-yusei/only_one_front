import { Box } from '@chakra-ui/react';
import { DisplayDryer, DisplayShower, DisplayWasher } from '../components/Dashboard';

const yamaDashboardPage = () => {
  return (
    <Box>
      <DisplayShower showerData={[true, false]} />
      <DisplayWasher washerData={[true, false]} />
      <DisplayDryer dryerData={[true, false]} />
    </Box>
  );
};

export default yamaDashboardPage;
