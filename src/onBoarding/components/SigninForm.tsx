'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginValues } from "../validators";

export default function LoginForm({ lng }: { lng: string }) {

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: LoginValues) => console.log(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 container mx-auto max-w-3xl">
      
      {/* Email */}
      <div>
        <input {...form.register("email")} className="border p-2 w-full" />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <input type="password" {...form.register("password")} className="border p-2 w-full" />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <button className="bg-blue-600 text-white py-2 w-full">Submit</button>
    </form>
  );
}
