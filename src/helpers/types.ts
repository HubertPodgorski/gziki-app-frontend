export enum Roles {
  ADMIN = "ADMIN",
}

export interface User {
  _id: string;

  dogs: Dog[];
  name: string;
  email: string;
  password: string;
  // TODO: add enums
  roles: Roles[];
}

export interface Task {
  _id: string;

  dogs: Dog[];
  description: string;
  position: Position;
}

export interface Position {
  columnIndex: number;
  rowIndex: number;
  positionIndex: number;
}

export interface Dog {
  _id: string;
  name: string;
  note?: string;
}

export interface Event {
  _id: string;
  date: string;
  name: string;
  dogs: { status: string; _id: string }[];
  users: {
    status: string;
    _id: string;
  }[];
}

export interface DogTask {
  _id: string;
  name: string;
}

export interface EventTemplate {
  _id: string;
  name: string;
  tasks: Task[];
}

export interface DogWithAttendance extends Dog {
  status?: string;
}

export interface DogWithAttendanceAndPlannedInfo extends DogWithAttendance {
  isPlanned?: boolean;
}

export interface Subscription {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
  team: string;
  userId: string;
}

export interface Settings {
  team: string;
  userUpdatingNotes?: string | null;
}

export interface CrossPass {
  _id: string;
  dogId: string;
  runningOnDog?: Dog;
  runningOnLights?: boolean;
  note?: string;
  startingPosition?: string;
}
