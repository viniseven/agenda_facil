export enum AvailableTimeMorning {
  "08:00:00" = "08:00",
  "08:30:00" = "08:30",
  "09:00:00" = "09:00",
  "09:30:00" = "09:30",
  "10:00:00" = "10:00",
  "10:30:00" = "10:30",
  "11:00:00" = "11:00",
  "11:30:00" = "11:30",
}

export enum AvailableTimeAfternoon {
  "12:00:00" = "12:00",
  "12:30:00" = "12:30",
  "13:00:00" = "13:00",
  "13:30:00" = "13:30",
  "14:00:00" = "14:00",
  "14:30:00" = "14:30",
  "15:00:00" = "15:30",
  "16:00:00" = "16:00",
  "16:30:00" = "16:30",
  "17:00:00" = "17:00",
  "17:30:00" = "17:30",
}

export enum AvailableTimeNight {
  "18:00:00" = "18:00",
  "18:30:00" = "18:30",
  "19:00:00" = "19:00",
  "19:30:00" = "19:30",
  "20:00:00" = "20:00",
  "20:30:00" = "20:30",
  "21:00:00" = "21:00",
  "21:30:00" = "21:30",
  "22:00:00" = "22:00",
  "22:30:00" = "22:30",
  "23:00:00" = "23:00",
  "23:30:00" = "23:30",
}

const availableTimeMorning = Object.entries(AvailableTimeMorning).map(
  ([key, value]) => ({
    value: key,
    label: value,
  }),
);

const availableTimeAfternoon = Object.entries(AvailableTimeAfternoon).map(
  ([key, value]) => ({
    value: key,
    label: value,
  }),
);

const availableTimeNight = Object.entries(AvailableTimeNight).map(
  ([key, value]) => ({
    value: key,
    label: value,
  }),
);

export { availableTimeAfternoon, availableTimeMorning, availableTimeNight };
