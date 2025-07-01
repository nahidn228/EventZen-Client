import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hook/useAxiosPublic";
import { useNavigate } from "react-router";

interface EventFormValues {
  eventTitle: string;
  name: string;
  eventDate: string;
  location: string;
  description: string;
  attendeeCount: number;
}

const AddEvent = () => {
  const navigate = useNavigate();
  const form = useForm<EventFormValues>({
    defaultValues: {
      eventTitle: "",
      name: "",
      eventDate: "",
      location: "",
      description: "",
      attendeeCount: 0,
    },
  });

  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const onSubmit = async (values: EventFormValues) => {
    try {
      setLoading(true);

      const currentUser = localStorage.getItem("currentUser");
      const user = currentUser ? JSON.parse(currentUser) : null;
      const email = user?.email;
      const token = user?.token;

      const payload = { ...values, email };

      await axiosPublic.post("/events/create-Event", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      form.reset();
      setAlertMessage("Event added successfully!");
      setAlertType("success");

      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
        navigate("/myEvents");
      }, 1500); // optional delay before navigation
    } catch (error) {
      console.error("Failed to add event:", error);
      setAlertMessage("Failed to add event. Please try again.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto mt-10 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#ED4250]">
        Add Event
      </h2>

      {alertMessage && alertType && (
        <Alert
          variant={alertType === "success" ? "default" : "destructive"}
          className="mb-6"
        >
          <AlertTitle>
            {alertType === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Event Title */}
          <FormField
            control={form.control}
            name="eventTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Digital Marketing Expo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posted By</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date and Time */}
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date & Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Online or Venue Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the event..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* AttendeeCount */}
          <FormField
            control={form.control}
            name="attendeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attendee Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormDescription>
                  Default is 0; change if needed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3A39CE] hover:bg-[#2a29a6] text-white"
          >
            {loading ? "Adding..." : "Add Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddEvent;
