export interface DataAssignment {
  id: string;
  name: string;
  lesson: Lesson[];
}

export interface Lesson {
  name: string;
  id: string;
  assingment: Assingment[];
}

export interface Assingment {
  id: string;
  task: string;
  fileUrl: string;
  deadline: string;
  lessonId: string;
  time: string;
  classId: string;
  createBy: string;
  classroom: {
    name: string;
  };
}
