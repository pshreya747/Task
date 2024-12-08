import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/styles.css';

const SignUpForm: React.FC = () => {
    const [isSignedUp, setIsSignedUp] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: (values) => {
            setIsSignedUp(true);
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} aria-label="Sign Up Form">
            <h2>Sign Up</h2>
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
                    placeholder="Create a password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    {...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
            </div>
            <button type="submit">Sign Up</button>
            {isSignedUp && <p className="success">Sign Up Successful!</p>}
        </form>
    );
};

export default SignUpForm;
