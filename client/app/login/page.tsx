"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { BACKEND_URL } from "../config";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; // Assuming you're using Lucide icons
import Appbar from "@/components/Appbar";
import { useRouter } from "next/navigation";

// Define schema with Zod for validation
const formSchema = z.object({
  email: z.string().min(2, { message: "email must be at least 2 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Initialize form with react-hook-form and Zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

// Define your `onSubmit` function
async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values; // Destructure values from the form
    try {
      // Send the POST request using fetch API
      const response = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // Parse the response JSON
      const data = await response.json();

      // Check if token exists in the response
      if (data?.token) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        console.error('Login failed: No token received');
        // Optionally show a message to the user (e.g., alert or toast)
      }
    } catch (error: any) {
      // Log the error details for debugging
      console.error('Error signing in:', error.message || error);
      // Optionally show an alert to the user with the error message
      alert(error.message || 'Something went wrong during login.');
    }
  }

  return (
        <div>
            <Appbar/>
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
            <p className="text-sm opacity-50 text-center">Login to access your account</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Username Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                {/* Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <div className="relative">
                            <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Abcd1234@"
                            {...field}
                            />
                            <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full bg-[#ff4f01] hover:bg-[#ff2b01] transition-all duration-200 text-white font-bold rounded-lg px-6">
                    Log in
                </Button>
                </form>
            </Form>
        </div>
    </div>
  );
}
