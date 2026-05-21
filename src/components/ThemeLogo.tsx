'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme, Flex } from '@once-ui-system/core';

export const ThemeLogo: React.FC = () => {
  const { theme } = useTheme();
  
  const [currentTheme, setCurrentTheme] = useState('light');
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute('data-theme') || 'light');
  }, []);

  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute('data-theme') || 'light');
  }, [theme]);


  let logoSrc = '/images/logo-light.svg';
  let logoAlt = 'AlgoCrew Brand Logo - Light Theme';

  if (mounted) {
    if (currentTheme === 'dark') {
      logoSrc = '/images/logo-light.svg';
      logoAlt = 'AlgoCrew Brand Logo - Light Theme';
    } 
    else {
      logoSrc = '/images/logo-dark.svg';
      logoAlt = 'AlgoCrew Brand Logo - Dark Theme';
    }
  }

  if (!mounted) {
    return (
      <Flex vertical="center" zIndex={10} gap="s">
        <div style={{ height: '40px', width: '40px' }} /> 
      </Flex>
    );
  }

  return (
    <Flex vertical="center" zIndex={10} gap="s" >
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={120}
        height={40}
        style={{ display: 'block' }}
        priority
      />
    </Flex>
  );
};
