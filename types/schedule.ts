export interface DataSchedule {
  id: string;
  name: string;
  lesson: Lesson[];
}

export interface Lesson {
  name: string;
  cat: string;
  schedule: Schedule[];
}

export interface Schedule {
  id: string;
  day: string;
  time: string;
  classroom: {
    name: string;
  };
}
