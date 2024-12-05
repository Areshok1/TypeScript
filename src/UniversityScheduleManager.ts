import data from './data.json';

console.log(data.professor);
// Типи
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = {
  id: number;
  name: string;
  department: string;
};

type Classroom = {
  number: string;
  capacity: number;
  hasProjector: boolean;
};

type Course = {
  id: number;
  name: string;
  type: CourseType;
};

type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};
// Обробка конфліктів та валідація:

type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetails: Lesson;
};

// Масиви даних
const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];

// Функції
function addProfessor(professor: Professor): void {
  professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  if (conflict) {
    console.error("Conflict detected:", conflict);
    return false;
  }
  schedule.push(lesson);
  return true;
}

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
  const occupiedClassrooms = schedule
    .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
    .map(lesson => lesson.classroomNumber);
  return classrooms
    .filter(classroom => !occupiedClassrooms.includes(classroom.number))
    .map(classroom => classroom.number);
}

function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter(lesson => lesson.professorId === professorId);
}

function validateLesson(lesson: Lesson): ScheduleConflict | null {
  const hasProfessorConflict = schedule.some(existingLesson => 
    existingLesson.professorId === lesson.professorId &&
    existingLesson.dayOfWeek === lesson.dayOfWeek &&
    existingLesson.timeSlot === lesson.timeSlot
  );
  if (hasProfessorConflict) {
    return { type: "ProfessorConflict", lessonDetails: lesson };
  }

  const hasClassroomConflict = schedule.some(existingLesson => 
    existingLesson.classroomNumber === lesson.classroomNumber &&
    existingLesson.dayOfWeek === lesson.dayOfWeek &&
    existingLesson.timeSlot === lesson.timeSlot
  );
  if (hasClassroomConflict) {
    return { type: "ClassroomConflict", lessonDetails: lesson };
  }

  return null;
}

// Тестові дані та функції для аналізу
function getClassroomUtilization(classroomNumber: string): number {
  const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
  return (totalLessons / 5) * 100; // Припустимо, що є 5 уроків на тиждень
}

function getMostPopularCourseType(): CourseType | null {
  const courseTypeCount = courses.reduce((acc, course) => {
    acc[course.type] = (acc[course.type] || 0) + 1;
    return acc;
  }, {} as Record<CourseType, number>); // Явне приведення до Record<CourseType, number>

  // Перетворюємо ключі на CourseType перед порівнянням
  return Object.keys(courseTypeCount).reduce((a, b) => 
    courseTypeCount[a as CourseType] > courseTypeCount[b as CourseType] ? a : b
  ) as CourseType; // Явне приведення ключів до типу CourseType
}

