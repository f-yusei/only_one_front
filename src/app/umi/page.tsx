import { Box } from '@chakra-ui/react';
import { DisplayShower, DisplayWasher, DisplayDryer } from '../components/Dashboard';

const umiDashboardPage = () => {
  return (
    <Box>
      <DisplayShower showerData={[true, false]} />
      <DisplayWasher washerData={[true, false]} />
      <DisplayDryer dryerData={[true, false]} />
    </Box>
  );
};

export default umiDashboardPage;
