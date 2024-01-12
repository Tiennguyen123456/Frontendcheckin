import { EventStatus } from "../constants/enum";

export function getColorTagEventStatus(eventStatus: string) {
  switch (eventStatus) {
    case EventStatus.Active:
      return "event-active";
    case EventStatus.Cancel:
      return "event-cancel";
    case EventStatus.Done:
      return "event-done";
    case EventStatus.Inactive:
      return "event-inactive";
    case EventStatus.New:
      return "event-new";
    default:
      return "";
  }
}
