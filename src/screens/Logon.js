import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TokenContext } from "../contexts/TokenContext";
import { useHistory, Redirect } from 'react-router-dom';
import AppAppBar from '../modules/AppAppBar';
import withRoot from '../withRoot';

/**
 * Inputs for MAS: 
 * 
 * ENDPOINT = http://magnus.unx.sas.com/microanalyticScore/modules/idsbj/steps/execute
 * 
 * 4 inputs:
      "name": "creditscore",
      "name": "dti",
      "name": "householdincome",
      "name": "unemploymentrate"

 * 4 outputs: 
      "name": "meadjcreditlimit",
      "name": "mesuggestedapr",
      "name": "suggestedapr",
      "name": "suggestedcreditlimit"
 *   
 * 
 */
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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  } 
}));

function Logon() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useContext(TokenContext);
  const history = useHistory();

  // can turn this into a hook.
  if (state.access_token !== null) {
      return <Redirect to="/home"/>
  }

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encoding = btoa("fsbu_challenge:mysecret");
    var dataString = `grant_type=password&username=${username}&password=${password}`;
    setUsername("");
    setPassword("");
    try {
      const result = await axios({
        method: "post",
        url: "http://magnus.unx.sas.com/SASLogon/oauth/token",
        data: dataString,
        headers: {
          Authorization: `Basic ${encoding}`,
        },
      });
      setState({access_token: result.data.access_token});
      history.push("/Score");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
    <AppAppBar/>
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          color="secondary"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={handleChange}
          autoComplete="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          color="secondary"
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember"/>}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color=""
          color="secondary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}

export default withRoot(Logon);

/*
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="text"
            value={password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
 */
