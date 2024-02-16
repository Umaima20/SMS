import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './students/entities/student.entity';
import { TeacherEntity } from './teachers/entities/teacher.entity';
import { CourseEntity } from './courses/entities/course.entity';
import { StudentCourseEntity } from './courses/entities/student-course.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'smsrole',
    password: 'abc123',
    database: 'sms',
    entities: [StudentEntity, TeacherEntity, CourseEntity, StudentCourseEntity],
    synchronize: true,
  }),
    StudentsModule, 
    TeachersModule, 
    CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
