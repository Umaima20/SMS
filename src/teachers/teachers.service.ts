import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersRepository } from './teachers.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeachersRepository)
    private readonly teachersRepository: TeachersRepository,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const teacher =
      await this.teachersRepository.createTeacher(createTeacherDto);
    return {
      success: true,
      data: teacher,
    };
  }

  async findAll() {
    const getTeachers = await this.teachersRepository.find({
      relations: {
        courses: true,
      },
    });
    return getTeachers;
  }

  findOne(id: number) {
    return this.teachersRepository.findById(id);
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teachersRepository.updateTeacher(id, updateTeacherDto);
  }

  remove(id: number) {
    return this.teachersRepository.removeTeacher(id);
  }
}
