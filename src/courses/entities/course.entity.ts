import { StudentEntity } from 'src/students/entities/student.entity';
import { TeacherEntity } from 'src/teachers/entities/teacher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @ManyToMany(() => StudentEntity, (students) => students.courses)
  @JoinTable({
    name: 'studentCourses',
    joinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'student_courses_student_id',
    },
    inverseJoinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'student_courses_course_id',
    },
  })
  students: StudentEntity[];

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.courses)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherEntity;
}
