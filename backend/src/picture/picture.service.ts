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
    // Construiser le chemin relatif en fonction du nom de fichier
    const relativeImagePath = `/images/${createPictureDto.fileName}`;

    // Créer une nouvelle instance de Picture avec le chemin relatif
    const newPicture = new Picture();
    newPicture.url = relativeImagePath;
    newPicture.productId = createPictureDto.productId;

    // Enregistrer l'instance dans la base de données
    return await this.pictureRepository.save(newPicture);
  }

  async findByProduct(productId: number): Promise<Picture[]> {
    return await this.pictureRepository.find({ where: { productId } });
  }

  async updatePic(productId: number, updatePictureDto: UpdatePictureDto) {
    return await this.pictureRepository.update(productId, updatePictureDto);
  }
}
