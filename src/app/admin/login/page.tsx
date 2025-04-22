import React from 'react'
import User, { IUser } from '@/admin/user/User.model'
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
import LoginForm from './loginForm';

export default async function AdminLoginPage() {
  // const user: IUser =  await User.create({
  //   name: "John Doe",
  //   email: "prosenjit@itobuz.com"
  // });
  // console.log(user);


  return (
    <Container size={420} my={40}>
      <LoginForm />
    </Container>
  )
}
