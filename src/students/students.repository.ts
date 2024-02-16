import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsRepository extends Repository<StudentEntity> {
  constructor(private dataSource: DataSource) {
    super(StudentEntity, dataSource.createEntityManager());
  }

  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      return this.save(createStudentDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return this.find();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number) {
    try {
      return this.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      const student = await this.findById(id);
      const updateStudent = { ...student, ...updateStudentDto };
      console.log(student);
      return this.save(updateStudent);
    } catch (error) {
      throw error;
    }
  }

  async removeStudent(id: number){
    try{
        const student = await this.findById(id);
        return this.remove(student);
    } catch (error){
        throw error;
    }
  }
}
