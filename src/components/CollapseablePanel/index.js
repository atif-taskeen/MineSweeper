import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextFieldWrapper from "../TextFieldWrapper";
import { Beginer, Intermediate, Expert } from "../../Config/field";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    color: '#8181de',
    fontWeight: 'bold',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  button: {
    background: '#8181de',
    color: '#fff'
  }
}));

const CollapseablePanel = ({variant}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [gameType, setGameType] = React.useState('1');

  const handleRadioChange = (event) => {
    setGameType(event.target.value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    let boardDimenssions = {}
    if (gameType === '1') {
      boardDimenssions = {
        height: 9,
        width: 9,
        mines: 10
      }
    } else if (gameType === '2') {
      boardDimenssions = {
        height: 16,
        width: 16,
        mines: 40
      }
    } else if (gameType === '3') {
      boardDimenssions = {
        height: 16,
        width: 30,
        mines: 99
      }
    }
    localStorage.setItem('data', JSON.stringify({
      ...boardDimenssions, 
      gameType: gameType
    }));
  }, [gameType]);

  return (
    <div className={classes.root}>
      {variant === 'Game' && <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{variant}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gameType" name="gameType" value={gameType} onChange={handleRadioChange}>
              <FormControlLabel value="1" control={<Radio />} label="Beginer" />
              <TextFieldWrapper
                config={Beginer}
              />
              <FormControlLabel value="2" control={<Radio />} label="Intermediate	" />
              <TextFieldWrapper
                config={Intermediate}
              />
              <FormControlLabel value="3" control={<Radio />} label="Expert" />
              <TextFieldWrapper
                config={Expert}
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>}
    </div>
  );
};

export default CollapseablePanel;
