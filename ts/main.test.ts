import {
    addProfessor,
    addLesson,
    cancelLesson,
    reassingClassroom,
    findAvailableClassroom,
    getProfessorSchedule,
    getClassroomUtilization,
    getMostPopularCourseType,
    validateLesson,
    professors, classrooms, courses, schedule, Professor, Classroom, Course, Lesson
} from './main';

const professor1: Professor = {id: 1, name: "John Doe", department: "Math"};

const classroom1: Classroom = {number: "101", capacity: 30, hasProjector: true};
const classroom2: Classroom = {number: "102", capacity: 25, hasProjector: false};

const course1: Course = {id: 1, name: "Math 101", type: "Lecture"};
const course2: Course = {id: 2, name: "Physics 101", type: "Seminar"};

const lesson1: Lesson = {
    lessonId: 1,
    courseId: 1,
    professorId: 1,
    classroomNumber: "101",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
};
const lesson2: Lesson = {
    lessonId: 2,
    courseId: 2,
    professorId: 2,
    classroomNumber: "102",
    dayOfWeek: "Tuesday",
    timeSlot: "10:15-11:45"
};

describe("Schedule Management", () => {

    beforeEach(() => {
        professors.length = 0;
        classrooms.length = 0;
        courses.length = 0;
        schedule.length = 0;
    });

    test("should add a professor", () => {
        addProfessor(professor1);
        expect(professors).toContainEqual(professor1);
    });

    test("should add a lesson to the schedule", () => {
        addLesson(lesson1);
        expect(schedule).toContainEqual(lesson1);
    });

    test("should not add a conflicting lesson (professor conflict)", () => {
        addLesson(lesson1);
        const conflictingLesson = {...lesson1, lessonId: 2, classroomNumber: "102"};
        const result = addLesson(conflictingLesson);
        expect(result).toBe(false);
    });

    test("should find available classrooms", () => {
        addLesson(lesson1);
        classrooms.push(classroom1, classroom2);
        const availableClassrooms = findAvailableClassroom("8:30-10:00", "Monday");
        expect(availableClassrooms).not.toContain("101");
        expect(availableClassrooms).toContain("102");
    });

    test("should return professor's schedule", () => {
        addLesson(lesson1);
        addLesson(lesson2);
        const profSchedule = getProfessorSchedule(1);
        expect(profSchedule).toHaveLength(1);
        expect(profSchedule[0]).toEqual(lesson1);
    });

    test("should return classroom utilization", () => {
        addLesson(lesson1);
        addLesson({...lesson1, lessonId: 2, timeSlot: "10:15-11:45"});
        const utilization = getClassroomUtilization("101");
        expect(utilization).toBeGreaterThan(0);
    });

    test("should return the most popular course type", () => {
        courses.push(course1, course1, course2);
        const popularCourseType = getMostPopularCourseType();
        expect(popularCourseType).toBe("Lecture");
    });

    test("should reassign classroom", () => {
        addLesson(lesson1);
        const result = reassingClassroom(1, "102");
        expect(result).toBe(true);
        expect(schedule[0].classroomNumber).toBe("102");
    });

    test("should not reassign classroom", () => {
        addLesson(lesson1);
        addLesson({...lesson1, classroomNumber: "102", professorId: 2});
        const result = reassingClassroom(1, "102");
        expect(result).toBe(false);
    });

    test("should cancel a lesson", () => {
        addLesson(lesson1);
        cancelLesson(1);
        expect(schedule).toHaveLength(0);
    });

    test("should validate lesson conflicts", () => {
        addLesson(lesson1);
        const conflictLesson = {...lesson1, lessonId: 2};
        const conflict = validateLesson(conflictLesson);
        expect(conflict).not.toBeNull();
        expect(conflict?.type).toBe("ProfessorConflict");
    });
});
