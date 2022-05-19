import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, MenuItem, Slider, Typography, InputLabel, FormHelperText, TextField, Select, FormControl } from '@mui/material'


function BrandAssessment() {
    const markets = useSelector((store) => store.markets);
    const pubs = useSelector((store) => store.pubs);

    // stores user inputs for markets & publications until submit
    const [state, setState] = useState({
        markets: [],
        pubs: [],
        stories_per_month: 0,
        pub_medium: '',
        affiliate_link: ''
    })

    const dispatch = useDispatch();
    const history = useHistory();
    
    // gets publications & markets from the database for multiselect fields
    useEffect(() => {
        dispatch({ type: 'GET_PUBS' });
        dispatch({ type: 'GET_MARKETS' });
    }, [])

    // when the user adds multiple publications, function stores value in state.
    const handlePubsChange = (event) => {
        const { options } = event.target;
        const inputs = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                inputs.push(options[i].value);
            }
        }
        setState({
            ...state,
            pubs: inputs
        });
    };

    // when the user adds multiple markets, function stores value in state.
    const handleMarketChange = (event) => {
        const { options } = event.target;
        const inputs = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                inputs.push(options[i].value);
            }
        }
        setState({
            ...state,
            markets: inputs
        });
    };

    const handleChange = (event) => {
        let value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        })
    }

    // sends state on dispatch pushes user to the thank you page
    const handleSubmit = () => {
        // console.log('state from the brand assessment: ', state);
        dispatch({ type: 'B_ASSESS', payload: state });
        history.push('/thankyou');
    }

    return (<>
        <Box sx={{
            backgroundColor: "#232323",
            align: "center",
            justifyContent: "left",
            textAlign: "left",
            height: "60vh",
            pl: "10vw",
            pr: "50vw",
            py: "10vh"
        }} >

            <Typography
                variant="h1"
                color="primary.light">
                Your Brand Assessment
            </Typography>

            <Typography
                variant="subtitle2"
                color="background.default"
                fontSize={32}
                paragraph={true}>
                Tell us about your business, so we can find the
                right folks to tell everyone else about it.
            </Typography>
        </Box>

        <Box sx={{
            align: "center",
            justifyContent: "left",
            textAlign: "left",
            height: "auto",
            pl: "10vw",
            pr: "50vw",
            py: "5vh"
        }} >
            {/* <FormControl> */}
            <form>
            <Box sx={{ my: "5vmax", justifyContent: "left", textAlign: "left", }}>

                <InputLabel shrink={false} htmlFor="select-multiple-markets">
                    Which markets does your brand sit in?
                </InputLabel>
                <InputLabel shrink htmlFor="select-multiple-markets">
                    Select all that apply
                </InputLabel>
                <Select
                    multiple
                    native
                    color="warning"
                    label="select-multiple-markets"
                    variant="filled"
                    value={state.markets}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handleMarketChange}
                    helperText="Hold ctrl or command to select multiple"
                    inputProps={{
                        id: 'select-multiple-markets',
                    }}
                >
                    {markets.map((market) => (
                        <option key={market.id} value={market.id}>
                            {market.market_name}
                        </option>
                    ))}
                </Select>
                <FormHelperText>Hold ctrl or command to select multiple options</FormHelperText>
            </Box>

            <Box sx={{ my: "5vmax", justifyContent: "left", textAlign: "left", }}>
                <InputLabel shrink={false} htmlFor="pub-medium">
                    What medium is your priority to be published in?
                </InputLabel>

                <Select
                    labelId="pub-medium"
                    value={state.pub_medium}
                    name="pub_medium"
                    variant="filled"
                    color="warning"
                    label="Medium"
                    onChange={handleChange}
                >
                    <MenuItem name="pub_medium" value={'print'}>Print</MenuItem>
                    <MenuItem name="pub_medium" value={'digital'}>Digital</MenuItem>
                    <MenuItem name="pub_medium" value={'broadcast'}>Broadcast</MenuItem>
                </Select>
                <FormHelperText>Please select one</FormHelperText>
            </Box>

            <Box sx={{ my: "5vmax", justifyContent: "left", textAlign: "left", }}>

                <InputLabel shrink={false} htmlFor="select-multiple-pubs">
                    Which publications do you consider to be your goals to be published in?
                </InputLabel>
                <InputLabel shrink htmlFor="select-multiple-pubs">
                    Select all that apply
                </InputLabel>
                <Select
                    multiple
                    native
                    variant="filled"
                    color="warning"
                    value={state.pubs}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handlePubsChange}
                    inputProps={{
                        id: 'select-multiple-pubs',
                    }}
                >
                    {pubs.map((pub) => (
                        <option key={pub.id} value={pub.id}>
                            {pub.pub_title}
                        </option>
                    ))}
                </Select>
                <FormHelperText>Hold ctrl or command to select multiple options</FormHelperText>
            </Box>

            <Box sx={{ my: "5vmax", justifyContent: "left", textAlign: "left", }}>
                <InputLabel shrink={false} htmlFor='stories-per-month'>
                    How many press placements per quarter would you consider to be a success?
                </InputLabel>
                <Slider
                value={state.stories_per_month}
                onChange={handleChange}
                name="stories_per_month"
                valueLabelDisplay="auto"
                color="warning"
                step={1}
                marks
                min={1}
                max={20}
            />
            </Box>

            <Box sx={{ my: "5vmax", justifyContent: "left", textAlign: "left", }}>
                <InputLabel shrink={false} htmlFor='stories-per-month'>
                    Are you currently on an affiliate platform? If so, what is your merchant link?
                </InputLabel>
                <TextField
                    labelId="stories-per-month"
                    color="warning"
                    variant="filled"
                    name="stories_per_month"
                    value={state.affiliate_link}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>

            <Button
                color="warning"
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    borderRadius: "2em",
                    typography: "h6",
                    textTransform: "lowercase"
                }}
            > submit </Button>
            </form>
            {/* </FormControl> */}
        </Box>
    </>);
}


export default BrandAssessment;
