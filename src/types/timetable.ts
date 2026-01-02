export interface Teacher {
  id: string;
  name: string;
  subject: 'Maths' | 'Physics' | 'Chemistry' | 'Biology';
}

export interface School {
  id: string;
  name: string;
  schedule: 'morning' | 'afternoon';
  days: string[];
}

export interface TimeSlot {
  period: number;
  teacher: Teacher;
  subject: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export interface SchoolTimetable {
  school: School;
  schedule: DaySchedule[];
}

export interface TimetableCombination {
  id: number;
  schoolA: SchoolTimetable;
  schoolB: SchoolTimetable;
}

export interface FormData {
  schoolAName: string;
  schoolBName: string;
  teachers: {
    maths1: string;
    maths2: string;
    physics: string;
    chemistry: string;
    biology: string;
  };
}
