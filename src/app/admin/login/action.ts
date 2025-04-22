'use server'
import { connectToMongoDB } from '@/admin/libs/dbConnect';
import User, { IUser } from '@/admin/user/User.model';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prev: any, formdata: { email: string, password: string }) {
  await connectToMongoDB(); // Ensure the database is connected
    console.log('Login action called', formdata);
  const { email, password } = formdata;
  console.log('Login action called with values:', email, password);
  const user: IUser | null = await User.findOne({ email });


  if (!user) {
    return {
      success: false,
      message: 'User not found',
    };
  }
    // For demo purposes, accept any login
    const token = 'fake-auth-token-' + Math.random().toString(36).substring(2);
  
    const cookieStore = await cookies();
    // Set a cookie that will be sent with requests
    cookieStore.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
    });
    
    redirect('/admin/profile');
 
}
