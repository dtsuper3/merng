import { gql, useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

export default function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { values, onChange, onSubmit } = useForm(registerUserCallback, {
        username: "",
        password: "",
        email: "",
        confirmPassword: ""
    });
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            // console.log(result);
            context.login(result.data.register);
            props.history.push("/");
        },
        onError(err) {
            // console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    });
    function registerUserCallback() {
        addUser()
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    type="text"
                    label="Username"
                    placeholder="Username"
                    name="username"
                    values={values.username}
                    onChange={onChange}
                    error={errors.username ? true : false}
                />
                <Form.Input
                    type="email"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    values={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false} />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    values={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false} />
                <Form.Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    values={values.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword ? true : false} />
                <Button type="submit" primary>Register</Button>
            </Form>
            {
                Object.keys(errors).length > 0 &&
                <div className="ui error message">
                    <ul className="list">
                        {
                            Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
            $username:String!
            $email:String!
            $password:String!
            $confirmPassword:String!
        ){
            register(
                registerInput:{
                    username:$username
                    email:$email
                    password:$password
                    confirmPassword:$confirmPassword
                }
            ){
                id 
                email
                createdAt
                username
                token
            }        
    } 
`
