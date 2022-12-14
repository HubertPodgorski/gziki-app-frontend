import { Dog, DogTask, EventTemplate, Task, User } from "../helpers/types";
import { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: Dispatch<SetStateAction<User>>;
}

export interface AppContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  dogs: Dog[];
  setDogs: Dispatch<SetStateAction<Dog[]>>;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  dogTasks: DogTask[];
  setDogTasks: Dispatch<SetStateAction<DogTask[]>>;
  eventTemplates: EventTemplate[];
  setEventTemplates: Dispatch<SetStateAction<EventTemplate[]>>;
}
