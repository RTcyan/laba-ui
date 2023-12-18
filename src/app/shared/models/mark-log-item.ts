import { ScheduleItem } from "./schedule-item";

export type MarkLogItem = {
  id: string;
  student: string;
  scheduleItem: ScheduleItem;
  value: number;
};