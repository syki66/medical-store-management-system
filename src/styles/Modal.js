import styled from 'styled-components';
import { Box, Grid } from "@mui/material";

const gap = '15px 0px';

const ModalContainer = styled(Box)`
  background-color: #d9d9d9;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
`;

const CloseButton = styled.div`
  text-align: right;
  padding-bottom: 10px;
`;

const GridContainer = styled(Grid)`
  background-color: #FFFFFF;
  padding: 10px;
  width: 700px;
  border-radius: 5px;
  
`;

const GridDescription = styled(Grid)`
  overflow: scroll;
  height: 200px;
  //max-height: 200px;
`;

const GridInnerTitle = styled(Grid)`
  font-size: x-large;
  font-weight: 600;
  margin: ${gap};
`;

const GridName = styled(Grid)`
  font-weight: 600;
  margin: ${gap};
`;

const GridContent = styled(Grid)`
  margin: ${gap};
`;

const StyledButton = styled.div`
  text-align: right;
  padding-top: 10px;
  button:nth-child(2){
    margin-left: 10px;
  }
`;



export {
    CloseButton,
    StyledButton,
    ModalContainer,
    GridContainer,
    GridDescription,
    GridInnerTitle,
    GridName,
    GridContent,
};