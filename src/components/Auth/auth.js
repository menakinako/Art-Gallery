import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import {useDispatch} from'react-redux';
import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import Input from './input'
import useStyles from './style'
import { useHistory } from "react-router";
import {signin, signup} from '../../actions/auth';

const initialState = {firstname:'', lastname:'', email: '', password:'', confirmPassword:''};

const Auth = ()=>{
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit =(e) =>{
       e.preventDefault();

       if(isSignup){
           dispatch(signup(formData, history));
       }else{
        dispatch(signin(formData, history));
       }
    };

     const handleChange =(e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
     }; 
     const switchMode = ()=>{
        setIsSignup((preIsSignup)=> !preIsSignup);
        setShowPassword(false);
     };
     const googleSuccess = async (res)=>{
             const result = res?.profileObj;
             const token = res?.tokenId;

             try {
                 dispatch({type:'AUTH', data: {result, token}});

                 history.push('/');
             } catch (error) {
                 console.log(error);
             }
     }
     const googleFailure =()=>{
             console.log("Google sign In was not Succesful! Try again")
     }


    return(
        <div>
           <Container component="main" maxWidth="xs">
               <Paper className={classes.paper} elevation={3}>
                   <Avatar className={classes.avatar}>
                       <LockOutlinedIcon />
                   </Avatar>
                   <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                   <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                      <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half/>
                                      <Input name="lastname" label="Last Name" handleChange={handleChange} half/>

                                    </>

                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text':'password'} handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup? 'Sign Up': 'Sign In'}
                        </Button>
                        <GoogleLogin 
                            clientId="306841506135-4f5u6ckl7j215g2ngoesl1ept90s2qmq.apps.googleusercontent.com"
                            render={(renderProps)=>(
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} variant="contained">
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justifyContent="flex-end">
                                <Grid item>
                                   <Button onClick={switchMode}>
                                       {isSignup? 'Already have an account? Sign In': "Do'nt have an account? Sign Up"}
                                   </Button>
                                </Grid>
                        </Grid>
                   </form>
               </Paper>
           </Container>
        </div>
    );
}

export default Auth;