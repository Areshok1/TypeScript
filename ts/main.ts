export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";

export type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

export type Professor = {
    id: number;
    name: string;
    department: string;
}

export type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
}

export type Course = {
    id: number;
    name: string;
    type: CourseType;
}

export type Lesson = {
    lessonId: number;
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
}

export type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson
}

export const professors: Professor[] = [];
export const classrooms: Classroom[] = [];
export const courses: Course[] = [];
export let schedule: Lesson[] = [];

export const addProfessor = (professor: Professor): void => {
    professors.push(professor);
}

export const addLesson = (lesson: Lesson): boolean => {
    if (validateLesson(lesson)) {
        return false;
    }
    schedule.push(lesson);
    return true;
}

export const findAvailableClassroom = (timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] => {
    const occupiedClassrooms: string[] = schedule
        .filter((lesson: Lesson) => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map((lesson: Lesson) => lesson.classroomNumber);

    return classrooms
        .map((classroom: Classroom) => classroom.number)
        .filter((classroomNumber: string) => !occupiedClassrooms.includes(classroomNumber))
}

export const getProfessorSchedule = (professorId: number): Lesson[] => {
    return schedule.filter((lesson: Lesson) => lesson.professorId === professorId);
}

export const validateLesson = (lesson: Lesson): ScheduleConflict | null => {
    const firstConflict: Lesson | undefined = schedule.find((scheduleLesson: Lesson) =>
        scheduleLesson.timeSlot === lesson.timeSlot &&
        (scheduleLesson.professorId === lesson.professorId ||
            scheduleLesson.classroomNumber === lesson.classroomNumber)
    );

    if (firstConflict) {
        const type: "ProfessorConflict" | "ClassroomConflict" =
            firstConflict.professorId === lesson.professorId ? "ProfessorConflict" : "ClassroomConflict";

        return {type, lessonDetails: lesson};
    }

    return null;
}

export const getClassroomUtilization = (classroomNumber: string): number => {
    const totalLessons: number = schedule.filter((lesson: Lesson) => lesson.classroomNumber === classroomNumber).length;
    const totalTimeSlots: number = 5;
    const totalDaysOfWeek: number = 5;

    return totalLessons / totalTimeSlots * totalDaysOfWeek * 100;
}

export const getMostPopularCourseType = (): CourseType => {
    const courseTypeCount: { [key in CourseType]?: number } = {};

    courses.forEach(course => {
        courseTypeCount[course.type] = (courseTypeCount[course.type] || 0) + 1;
    });

    return Object.keys(courseTypeCount)
        .reduce((a, b) => courseTypeCount[a as CourseType]! > courseTypeCount[b as CourseType]! ? a : b) as CourseType;
}

export const reassingClassroom = (lessonId: number, newClassroomNumber: string): boolean => {
    const lesson: Lesson | undefined = schedule.find((lesson: Lesson) => lesson.lessonId === lessonId);
    if (lesson && validateLesson({...lesson, professorId: -1, classroomNumber: newClassroomNumber}) === null) {
        lesson.classroomNumber = newClassroomNumber;
        return true;
    }
    return false;
};

export const cancelLesson = (lessonId: number): void => {
    schedule = schedule.filter((lesson: Lesson) => lesson.lessonId !== lessonId);
}