import React from 'react';
import {Box, Stack, Skeleton} from '@mui/material';
import styled from "styled-components";

export default function Loading() {
    return(
        <StyledStack sx={{ width: 1600 }}>
            <SkeletonText variant="text" width='1' height={83} />
            <SkeletonContent variant="rectangular" width='1' height={694} />
            <SkeletonText variant="text" width='1' height={40} />
        </StyledStack>
    )
}

const StyledStack = styled(Box)`
    && {
      background-color: #d9d9d9;
      padding: 0px 20px;
      height: 828px;
    }
`;

const SkeletonText = styled(Skeleton)`
    && {
      background-color: white;
    }
`;

const SkeletonContent = styled(Skeleton)`
    && {
      background-color: white;
    }
`;