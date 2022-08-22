import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Header, Footer, BetaWarningBanner, CustomModal } from 'components';
import Background from './Background';
import { useIsProMode } from 'state/application/hooks';

export interface PageLayoutProps {
  children: any;
  name?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, name }) => {
  const history = useHistory();
  const { isProMode, updateIsProMode } = useIsProMode();
  const [openPassModal, setOpenPassModal] = useState(false);
  const getPageWrapperClassName = () => {
    if (isProMode) {
      return '';
    }
    return name == 'prdt' ? 'pageWrapper-no-max' : 'pageWrapper';
  };
  useEffect(() => {
    const unlisten = history.listen((location) => {
      updateIsProMode(false);
    });
    return function cleanup() {
      unlisten();
    };
  }, [history, updateIsProMode]);

  useEffect(() => {
    if (
      window.location.host !== 'quickswap.exchange' &&
      window.location.host !== 'localhost:3000'
    ) {
      setOpenPassModal(true);
    }
  }, []);

  return (
    <Box className='page'>
      {openPassModal}
      <BetaWarningBanner />
      <Header />
      {!isProMode && <Background fallback={false} />}
      <Box className={getPageWrapperClassName()}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default PageLayout;
