import { Injectable } from '@nestjs/common';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './entities/picture.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
  ) {}

  async createPic(createPictureDto: CreatePictureDto) {
    console.log('createPictureDto :>> ', createPictureDto);
    return await this.pictureRepository.save(createPictureDto);
  }

  async findAll(): Promise<Picture[]> {
    return await this.pictureRepository.find();
  }

  async findOne(id: number): Promise<Picture> {
    return await this.pictureRepository.findOne({ where: { id: id } });
  }

  async findByProduct(productId: number): Promise<Picture[]> {
    return await this.pictureRepository.find({ where: { productId } });
  }

  async updatePic(productId: number, updatePictureDto: UpdatePictureDto) {
    return await this.pictureRepository.update(productId, updatePictureDto);
  }

  async removePic(productId: number) {
    return await this.pictureRepository.delete(productId);
  }
}
