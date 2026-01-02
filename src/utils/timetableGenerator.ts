import { Teacher, School, TimetableCombination, DaySchedule, TimeSlot } from '@/types/timetable';

const SCHOOL_A_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SCHOOL_B_DAYS = ['Thursday', 'Friday', 'Saturday'];
const PERIODS_PER_SESSION = 4;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createTeacherRotation(teachers: Teacher[], seed: number): Teacher[] {
  // Create different rotations based on seed
  const rotated = [...teachers];
  for (let i = 0; i < seed; i++) {
    const first = rotated.shift()!;
    rotated.push(first);
  }
  return rotated;
}

function generateDaySchedule(
  day: string,
  teachers: Teacher[],
  rotationOffset: number
): DaySchedule {
  const slots: TimeSlot[] = [];
  const rotatedTeachers = createTeacherRotation(teachers, rotationOffset);
  
  for (let period = 1; period <= PERIODS_PER_SESSION; period++) {
    const teacherIndex = (period - 1 + rotationOffset) % teachers.length;
    const teacher = rotatedTeachers[teacherIndex];
    slots.push({
      period,
      teacher,
      subject: teacher.subject,
    });
  }
  
  return { day, slots };
}

function generateSchoolTimetable(
  school: School,
  teachers: Teacher[],
  combinationSeed: number
): DaySchedule[] {
  const schedule: DaySchedule[] = [];
  
  school.days.forEach((day, dayIndex) => {
    const rotationOffset = (dayIndex + combinationSeed) % teachers.length;
    schedule.push(generateDaySchedule(day, teachers, rotationOffset));
  });
  
  return schedule;
}

export function generateTimetableCombinations(
  schoolAName: string,
  schoolBName: string,
  teacherNames: {
    maths1: string;
    maths2: string;
    physics: string;
    chemistry: string;
    biology: string;
  }
): TimetableCombination[] {
  const teachers: Teacher[] = [
    { id: '1', name: teacherNames.maths1, subject: 'Maths' },
    { id: '2', name: teacherNames.maths2, subject: 'Maths' },
    { id: '3', name: teacherNames.physics, subject: 'Physics' },
    { id: '4', name: teacherNames.chemistry, subject: 'Chemistry' },
    { id: '5', name: teacherNames.biology, subject: 'Biology' },
  ];

  const schoolA: School = {
    id: 'A',
    name: schoolAName,
    schedule: 'morning',
    days: SCHOOL_A_DAYS,
  };

  const schoolB: School = {
    id: 'B',
    name: schoolBName,
    schedule: 'afternoon',
    days: SCHOOL_B_DAYS,
  };

  const combinations: TimetableCombination[] = [];

  // Generate 3 different combinations with different rotation patterns
  for (let i = 0; i < 3; i++) {
    const shuffledTeachersA = i === 0 ? teachers : shuffleArray(teachers);
    const shuffledTeachersB = i === 0 ? [...teachers].reverse() : shuffleArray(teachers);

    combinations.push({
      id: i + 1,
      schoolA: {
        school: schoolA,
        schedule: generateSchoolTimetable(schoolA, shuffledTeachersA, i),
      },
      schoolB: {
        school: schoolB,
        schedule: generateSchoolTimetable(schoolB, shuffledTeachersB, i + 2),
      },
    });
  }

  return combinations;
}

export function getSubjectColor(subject: string): string {
  switch (subject) {
    case 'Maths':
      return 'bg-maths/10 text-maths border-maths/30';
    case 'Physics':
      return 'bg-physics/10 text-physics border-physics/30';
    case 'Chemistry':
      return 'bg-chemistry/10 text-chemistry border-chemistry/30';
    case 'Biology':
      return 'bg-biology/10 text-biology border-biology/30';
    default:
      return 'bg-muted text-muted-foreground';
  }
}
