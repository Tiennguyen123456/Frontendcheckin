export const ScreenWidth = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

export const emailRegex = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
export const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

export const DateTimeFormat = "DD/MM/YYYY hh:mm A";

export const DateFormat = "DD/MM/YYYY";

export const RoleStatus = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export const UserStatus = [
  { label: "Active", value: "ACTIVE" },
  { label: "New", value: "NEW" },
];

export const EventStatusOptions = [
  { label: "New", value: "NEW" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Done", value: "DONE" },
  { label: "Cancel", value: "CANCEL" },
];
