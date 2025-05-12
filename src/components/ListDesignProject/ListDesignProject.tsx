import { FC } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';

import { IDesignProject } from '@/types/design-project';

import Row from '../ui/Row';

import DesignProject, { DesignProjectSkeleton } from './DesignProject';

interface IProps {
  designProjects: IDesignProject[];
  isLoading?: boolean;
}

const ListDesignProject: FC<IProps> = ({ designProjects, isLoading }) => {
  return (
    <Row gap={8} sx={{ flexWrap: 'wrap' }}>
      <Grid container spacing={2} sx={{ flex: 1 }}>
        {isLoading ? (
          <>
            {[...Array(8).keys()].map((value) => (
              <GridItem key={value}>
                <DesignProjectSkeleton />
              </GridItem>
            ))}
          </>
        ) : (
          designProjects.map((designProject) => (
            <GridItem key={designProject.id}>
              <DesignProject designProject={designProject} />
            </GridItem>
          ))
        )}
      </Grid>
    </Row>
  );
};

const GridItem: FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} {...props}>
      {children}
    </Grid>
  );
};

export default ListDesignProject;
