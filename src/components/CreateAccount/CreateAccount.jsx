import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import {
    Container, Box, Typography, Link, InputLabel, TextField, Button, FormControl,
    FormControlLabel, Radio, RadioGroup, FormLabel, Stack
} from '@mui/material';

function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const errors = useSelector((store) => store.errors);

    const user = {
        first_name: '',
        last_name: '',
        city: '',
        state: '',
        username: '',
        password: '',
        user_type: '',
        approved: false
    }

    const [newUser, setNewUser] = useState(user);

    const registerUser = (event) => {
        event.preventDefault();
        console.log('newUser:', newUser);

        dispatch({
            type: 'REGISTER',
            payload: newUser
        });
        setNewUser(user);
    }; // end registerUser

    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <Typography variant="h3">
                Create account
            </Typography>
            <Typography sx={{ mt: 1, fontSize: '1em' }}> Already have an account?
                <Link
                    color="#546D1D"
                    onClick={() => { history.push('/login') }}
                    sx={{ pl: 1.5, cursor: 'pointer', color: '#546D1D' }}
                >
                    Sign in
                </Link>
            </Typography>
            <form onSubmit={registerUser}>
                {errors.registrationMessage && (
                    <h3 className="alert" role="alert">
                        {errors.registrationMessage}
                    </h3>
                )}
                <Stack spacing={4} sx={{ mt: 8, mb: 10 }}>
                    <Box display="flex" justifyContent="space-between">
                        <Box sx={{ width: '48.5%' }}>
                            <InputLabel htmlFor="email" variant="standard" color="primary">Email</InputLabel>
                            <TextField
                                type="text"
                                name="email"
                                value={newUser.username}
                                color="info"
                                required
                                fullWidth
                                onChange={(event) => setNewUser({ ...newUser, username: event.target.value })}
                            />
                        </Box>
                        <Box sx={{ width: '48.5%' }}>
                            <InputLabel htmlFor="password" variant="standard" color="primary">Password</InputLabel>
                            <TextField
                                type="text"
                                name="password"
                                value={newUser.password}
                                color="info"
                                fullWidth
                                required
                                onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Box sx={{ width: '48.5%' }}>
                            <InputLabel htmlFor="first name" variant="standard" color="primary">First name</InputLabel>
                            <TextField
                                type="text"
                                name="first name"
                                value={newUser.first_name}
                                color="info"
                                required
                                fullWidth={true}
                                onChange={(event) => setNewUser({ ...newUser, first_name: event.target.value })}
                            />
                        </Box>
                        <Box sx={{ width: '48.5%' }}>
                            <InputLabel htmlFor="last name" variant="standard" color="primary">Last name</InputLabel>
                            <TextField
                                type="text"
                                name="last name"

                                color="info"
                                value={newUser.last_name}
                                fullWidth={true}
                                required
                                onChange={(event) => setNewUser({ ...newUser, last_name: event.target.value })}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Box sx={{ width: '48.5%' }}>
                            <InputLabel htmlFor="city" variant="standard" color="primary">City</InputLabel>
                            <TextField
                                type="text"
                                name="city"

                                color="info"
                                value={newUser.city}
                                required
                                fullWidth={true}
                                onChange={(event) => setNewUser({ ...newUser, city: event.target.value })}
                            />
                        </Box>
                        <Box sx={{ width: '48.5%' }}>
                            <InputLabel htmlFor="State" variant="standard" color="primary">State</InputLabel>
                            <TextField
                                type="text"
                                name="state"
                                color="info"
                                value={newUser.state}
                                fullWidth={true}
                                required
                                inputProps={{ maxLength: 2 }}
                                sx={{ width: 70 }}
                                onChange={(event) => setNewUser({ ...newUser, state: event.target.value })}
                            />
                        </Box>
                    </Box>
                    <FormControl>
                        <FormLabel color="info" sx={{ fontSize: '1.3em' }}>I am a...</FormLabel>
                        <RadioGroup onChange={(event) => setNewUser({ ...newUser, user_type: event.target.value })}>
                            <FormControlLabel value="journalist" control={<Radio color="info" />} label="Journalist" />
                            <FormControlLabel value="brand" control={<Radio color="info" />} label="Brand owner/representative" />
                        </RadioGroup>
                    </FormControl>
                    {newUser.user_type === 'journalist' ?
                        <>
                            <Box>
                                <InputLabel htmlFor="journalist credentials" variant="standard" color="primary">Journalist credentials</InputLabel>
                                <TextField
                                    type="text"
                                    name="journalist credentials"
                                    multiline
                                    minRows={4}
                                    color="info"
                                    value={newUser.description}
                                    fullWidth={true}
                                    required
                                    onChange={(event) => setNewUser({ ...newUser, description: event.target.value })}
                                />
                            </Box>
                            <Button
                                type="submit"
                                variant="text"
                                disableElevation
                                color="info"
                                size="large"
                                fullWidth={true}
                                sx={{ textTransform: 'none', fontSize: '1.6em' }}
                            >
                                Submit for approval
                            </Button>
                        </>
                        : newUser.user_type === 'brand' ?
                            <>
                                <Box>
                                    <InputLabel htmlFor="brand description" variant="standard" color="primary">Brand description</InputLabel>
                                    <TextField
                                        type="text"
                                        name="brand description"
                                        multiline
                                        minRows={4}
                                        color="info"
                                        value={newUser.description}
                                        fullWidth={true}
                                        required
                                        onChange={(event) => setNewUser({ ...newUser, description: event.target.value })}
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    variant="text"
                                    disableElevation
                                    color="info"
                                    size="large"
                                    fullWidth={true}
                                    sx={{ textTransform: 'none', fontSize: '1.6em' }}
                                >
                                    Submit for approval
                                </Button>
                            </>
                            :
                            <></>
                    }
                </Stack>
            </form>
        </Container>
    )
}

export default CreateAccount;