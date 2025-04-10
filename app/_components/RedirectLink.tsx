import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { useCreateStyles } from '@/_hooks/use-app-style';
import { FunctionCreateStyles } from '@/_types/style';

interface IProps {
  href: string;
  label: string;
}
const RedirectLink: FC<IProps> = ({ href, label }) => {
  const styles = useCreateStyles(createStyles);

  return (
    <Link href={href}>
      <Typography sx={styles.text}>{label}</Typography>
    </Link>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    text: {
      color: theme.palette.primary.main,
      textAlign: 'center',
      textDecoration: 'underline',
      marginTop: theme.spacing(2),
    },
  };
};

export default RedirectLink;
