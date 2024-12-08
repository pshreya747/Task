import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/styles.css';

const LoginForm: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
        }),
        onSubmit: (values) => {
            setIsLoggedIn(true);
            if (values.rememberMe) {
                localStorage.setItem('email', values.email);
            }
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} aria-label="Login Form">
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button type="submit">Login</button>
            {isLoggedIn && <p className="success">Login Successful!</p>}
        </form>
    );
};

export default LoginForm;
