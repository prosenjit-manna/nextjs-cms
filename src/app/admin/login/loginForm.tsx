'use client'
import React from 'react'
import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import classes from './admin-login.module.css';
import { useForm } from '@mantine/form';

export default function LoginForm() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },

        // validate: {
        //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        //     password: (value) => (value.length < 6 ? 'Password should include at least 6 characters' : null),
        // },
    });

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>


            <form onSubmit={form.onSubmit((values) => {
                console.log('Form values:', values);
                // Perform login logic here
                // For example, send a request to your API
                fetch('/api/login', {
                    method: 'POST',
                    headers: {  'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                })
                    .then((response) => {
                        if (response.ok) {
                            // Handle successful login
                            console.log('Login successful');
                        } else {
                            // Handle login error
                            console.error('Login failed');
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput {...form.getInputProps('email')} label="Email" placeholder="you@mantine.dev" required />
                    <PasswordInput {...form.getInputProps('password')} label="Password" placeholder="Your password" required mt="md" />
                    <Button fullWidth mt="xl" type="submit">
                        Sign in
                    </Button>
                </Paper>
            </form>
        </Container>
    )
}
