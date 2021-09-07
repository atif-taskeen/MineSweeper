import React, { useState } from "react";
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Base64 } from 'js-base64';

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

const Accordians = ({ variant, gameTypeSetter, gameType, expand, encode, ImportHandler }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [encodeValue, setEncodeValue] = useState('');
  //const [valid, setValidation] = useState(false);

  const handleRadioChange = (event) => {
    gameTypeSetter(event.target.value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePasteText = () => {
    ImportHandler(encodeValue);
  }

  const changeFieldHandler = (e) => {
    // const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    // if(btoa(atob(encodeValue))==encodeValue) {
    //   setValidation(true)
    // }
    setEncodeValue(e.target.value)
  }

  return (
      <Accordion expanded={expanded === expand} onChange={handleChange(expand)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${expand}bh-content`}
          id={`${expand}bh-header`}
        >
          <Typography className={classes.heading}>{variant}</Typography>
        </AccordionSummary>
        <AccordionDetails className={variant === 'Export' ? 'accordian-w100' : ''}>
          {variant === 'Game' && 
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
          }
          {
            variant === 'Export' && 
            <>
              <div className={variant === 'Export' ? 'accordian-w100' : ''}>
                <TextField
                  label="Export"
                  multiline
                  maxRows={4}
                  style={{ width: '100%' }}
                  value={encode}
                />
                <CopyToClipboard text={encode}>
                  <Button variant="contained" color="primary" style={{marginTop: 20}}>
                    Copy
                  </Button>
                </CopyToClipboard>
                
              </div>
            </>
          }
          {
            variant === 'Import' && 
            <>
              <div className={variant === 'Export' ? 'accordian-w100' : ''}>
                <TextField
                  label="Import"
                  multiline
                  maxRows={4}
                  style={{ width: '100%' }}
                  value={encodeValue}
                  onChange={changeFieldHandler}
                />
                <Button variant="contained" color="primary" style={{marginTop: 20}} onClick={handlePasteText}>
                  Paste
                </Button>
              </div>
            </>
          }
        </AccordionDetails>
      </Accordion>
  );
};

export default Accordians;
