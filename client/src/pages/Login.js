import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client';
import { Button, Form } from "semantic-ui-react";
import { useForm } from '../utils/hooks';
import { AuthContext } from "../context/auth";

export default function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { values, onChange, onSubmit } = useForm(registerUserCallback, {
        username: "",
        password: "",
    });
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            // console.log(result.data.login);
            context.login(result.data.login);
            props.history.push("/");
        },
        onError(err) {
            // console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    });
    function registerUserCallback() {
        loginUser()
    }


    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
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
                    type="password"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    values={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false} />
                <Button type="submit" primary>Login</Button>
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

const LOGIN_USER = gql`
    mutation login(
            $username:String!            
            $password:String!            
        ){
            login(username:$username,password:$password){
                id 
                email
                createdAt
                username
                token
            }        
    } 
`
