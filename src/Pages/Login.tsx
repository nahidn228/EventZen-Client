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
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hook/useAxiosPublic";
import { useState } from "react";
import { useNavigate } from "react-router";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    console.log("Login data:", values);
    try {
      setLoading(true);
      const res = await axiosPublic.post("/users/login", values);
      console.log("Login response:", res.data);

      if (res.data.success) {
        alert("Login successful!");

        const user = res.data.user;

        // Store user info in localStorage
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            token: user.token,
          })
        );

        navigate("/");
      } else {
        alert("Login failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Failed to login:", error);
      alert("Failed to login. Check email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
