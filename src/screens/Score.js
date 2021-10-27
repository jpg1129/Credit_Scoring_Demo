import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import { TokenContext } from "../contexts/TokenContext";
import { useHistory, Redirect } from "react-router-dom";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Result from "./Result";
import AppAppBar from '../modules/AppAppBar';
import withRoot from '../withRoot';



// move to component
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        SAS Institute
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    backgroundColor: 'secondary'
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


function Score() {
  const classes = useStyles();
  const [state, setState] = useContext(TokenContext);
  const [creditScore, setCreditScore] = useState("");
  const [dti, setDti] = useState("");
  const [householdIncome, setHousehouseIncome] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [scoreResult, setScoreResult] = useState({});

  if (state.access_token === null) {
    return <Redirect to="/Logon" />;
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (e) => {
    if (e.target.name === "creditScore") {
      setCreditScore(e.target.value);
    } else if (e.target.name === "dti") {
      setDti(e.target.value);
    } else if (e.target.name === "householdIncome") {
      setHousehouseIncome(e.target.value);
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var requestJSON = {
      inputs: [
        {
          name: "creditscore",
          type: "decimal",
          value: parseFloat(creditScore),
        },
        {
          name: "dti",
          type: "decimal",
          value: parseFloat(dti),
        },
        {
          name: "householdincome",
          type: "decimal",
          value: parseFloat(householdIncome),
        }
      ],
    };
    const inputData = JSON.stringify(requestJSON);
    try {
      const result = await axios({
        method: "post",
        url:
          "http://magnus.unx.sas.com/microanalyticScore/modules/sbjpython/steps/execute",
        data: inputData,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.access_token,
        },
      });
      console.log(result);
      setState((state) => ({
        ...state,
        meAdjCreditLimit: result.data.outputs[24].value,
        meSuggestedAPR: result.data.outputs[25].value,
        suggestedAPR: result.data.outputs[26].value,
        suggestedCreditLimit: result.data.outputs[27].value,
        unemploymentRate: result.data.outputs[28].value
      }));
      handleNext();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>      
    <CssBaseline /> 
    <AppAppBar />
   {activeStep == 0 ? (
     <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography style={{marginBottom: '15px'}} component="h1" variant="h4" align="center">
            Credit Application Form
          </Typography>
          <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="creditScore"
                    name="creditScore"
                    label="Credit Score"
                    fullWidth
                    onChange={handleChange}
                    value={creditScore}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="dti"
                    name="dti"
                    label="Debt to Income"
                    fullWidth
                    onChange={handleChange}
                    value={dti}
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="householdIncome"
                    name="householdIncome"
                    label="Household Income"
                    fullWidth
                    onChange={handleChange}
                    value={householdIncome}
                    color="secondary"
                  />
      
                </Grid>
              </Grid>
          </React.Fragment>
        </Paper>
        <div style={{ display: "flex" }}>
          <Button
            style={{ flex: "1 1 auto", marginRight: "5px" }}
            variant="contained"
            color="secondary"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            style={{ flex: "1 1 auto", marginRight: "5px" }}
            variant="contained"
            endIcon={<ClearIcon />}
          >
            Clear
          </Button>
        </div>
      </main>
      <Box mt={8}>
        <Copyright />
      </Box>
      </React.Fragment>
    ) : (
        <Result/>
    )}
    </React.Fragment>
  )
}

export default withRoot(Score);
