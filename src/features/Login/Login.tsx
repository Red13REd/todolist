import React from 'react';
import {useFormik} from "formik";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useAppDispatch, useCustomSelector} from "../../app/store";
import {loginTc} from "../../app/auth-reducer";
import {Navigate} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useCustomSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Password is required"
            } else if (values.password.length < 2) {
                errors.password = "Invalid password";
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTc(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to="/"/>
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>

                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{"color": "red"}}>{formik.errors.email}</div> : null}

                            <TextField
                                label="Password"
                                margin="normal"
                                type="password"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{"color": "red"}}>{formik.errors.password}</div> : null}

                            <FormControlLabel label={'Remember me'} control={<Checkbox/>}
                                              onChange={formik.handleChange}
                                              value={formik.values.rememberMe}

                                              name='rememberMe'
                            />

                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
        ;
};
