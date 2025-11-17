import { useEffect, useState } from "react";
import { Button } from "../../components/primitives/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/primitives/Modal";
import { formatDate } from "../../utils/date.utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../primitives/Select";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import type { CalendarEvent } from "./CalendarView.types";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  event?: CalendarEvent | null;
  initialDate?: Date;
  initialHour?: number;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onUpdate?: (id: string, updates: Partial<CalendarEvent>) => void;
  onDelete?: (id: string) => void;
}

export const EventModal = ({
  open,
  onClose,
  event,
  initialDate,
  initialHour,
  onSave,
  onUpdate,
  onDelete,
}: EventModalProps) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    color: "blue" | "green" | "purple" | "orange" | "red";
  }>({
    title: "",
    description: "",
    startDate: "",
    startTime: "09:00",
    endDate: "",
    endTime: "10:00",
    color: "blue",
  });

  useEffect(() => {
    Promise.resolve().then(() => {
      if (event) {
        setFormData({
          title: event.title,
          description: event.description || "",
          startDate: formatDate(event.startDate, "yyyy-MM-dd"),
          startTime: formatDate(event.startDate, "HH:mm"),
          endDate: formatDate(event.endDate, "yyyy-MM-dd"),
          endTime: formatDate(event.endDate, "HH:mm"),
          color: event.color || "blue",
        });
        return;
      }

      if (initialDate) {
        const dateStr = formatDate(initialDate, "yyyy-MM-dd");
        const hour =
          initialHour !== undefined
            ? initialHour.toString().padStart(2, "0")
            : "09";
        const nextHour =
          initialHour !== undefined
            ? (initialHour + 1).toString().padStart(2, "0")
            : "10";

        setFormData({
          title: "",
          description: "",
          startDate: dateStr,
          startTime: `${hour}:00`,
          endDate: dateStr,
          endTime: `${nextHour}:00`,
          color: "blue",
        });
      }
    });
  }, [event, initialDate, initialHour]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDate = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDate = new Date(`${formData.endDate}T${formData.endTime}`);

    const eventData = {
      title: formData.title,
      description: formData.description,
      startDate,
      endDate,
      color: formData.color,
    };

    if (event && onUpdate) {
      onUpdate(event.id, eventData);
    } else {
      onSave(eventData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create Event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Event title"
              required
              maxLength={100}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Event description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Select
              value={formData.color}
              onValueChange={(
                value: "blue" | "green" | "purple" | "orange" | "red"
              ) => setFormData({ ...formData, color: value })}
            >
              <SelectTrigger id="color">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="red">Red</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex justify-between">
            {event && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{event ? "Update" : "Create"}</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
