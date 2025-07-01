import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import useAxiosPublic from "@/hook/useAxiosPublic";

interface Event {
  _id: string;
  eventTitle: string;
  eventDate: string;
  name: string;
  location: string;
  description: string;
  attendeeCount: number;
}

const MyEventCard: React.FC<{ event: Event; refetch: () => void }> = ({
  event,
  refetch,
}) => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    eventTitle: event.eventTitle,
    eventDate: event.eventDate,
    name: event.name,
    location: event.location,
    description: event.description,
  });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axiosPublic.put(`/events/${event._id}`, formData);
      refetch();
      setIsDialogOpen(false);
      setSuccessMessage("Event updated successfully!");
      setErrorMessage(null);
    } catch (error) {
      console.error("Failed to update event:", error);
      setErrorMessage("Failed to update event.");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosPublic.delete(`/events/${event._id}`);
      refetch();
      setSuccessMessage("Event deleted successfully!");
      setErrorMessage(null);
    } catch (error) {
      console.error("Failed to delete event:", error);
      setErrorMessage("Failed to delete event.");
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition p-4 space-y-3 flex flex-col justify-between">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
          {event.eventTitle}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          🧑 Posted by: {event.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          📅 {new Date(event.eventDate).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          📍 {event.location}
        </p>
        <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
          {event.description}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          🎟️ {event.attendeeCount} attendees
        </p>
      </div>

      {/* Feedback Alerts */}
      {successMessage && (
        <Alert className="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-800 dark:text-green-100">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2 pt-2">
        {/* Update Button with Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              className="flex-1 px-3 py-1 rounded-md bg-[#3A39CE] hover:bg-[#2a29a6] text-white disabled:opacity-50 transition"
              disabled={loading}
            >
              Update
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Event Title"
                value={formData.eventTitle}
                onChange={(e) =>
                  setFormData({ ...formData, eventTitle: e.target.value })
                }
              />
              <Input
                type="datetime-local"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
              />
              <Input
                placeholder="Posted By"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 rounded-md bg-[#3A39CE] hover:bg-[#2a29a6] text-white disabled:opacity-50 transition w-full"
              >
                {loading ? "Updating..." : "Update Event"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Button with AlertDialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="flex-1 px-3 py-1 rounded-md bg-[#ED4250] hover:bg-[#c7333e] text-white disabled:opacity-50 transition"
              disabled={loading}
            >
              Delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete this
                event.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                {loading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default MyEventCard;
