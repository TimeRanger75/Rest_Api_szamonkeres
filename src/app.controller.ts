import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import ActorDto from './actor.dto';
import { AppService } from './app.service';
import Szinesz from './szinesz.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get('/szinesz')
  async listActors() {
    const actorRepo = this.dataSource.getRepository(Szinesz);
    return actorRepo.find();
  }

  @Post('/szinesz')
  async addActor(@Body() registerActor: ActorDto) {
    registerActor.id = undefined;
    if (!registerActor.nev || !registerActor.kor || !registerActor.film) {
      throw new BadRequestException('All fields are required');
    }
    if (registerActor.kor < 6) {
      throw new BadRequestException('Age must be higher than 6');
    }
    const actorRepo = this.dataSource.getRepository(Szinesz);
    const actor = new Szinesz();
    actor.nev=registerActor.nev;
    actor.kor=registerActor.kor;
    actor.film=registerActor.film;
    actor.id=registerActor.id;
    await actorRepo.save(actor);
  }

  @Delete('/szinesz/:id')
  async deleteActor(@Param('id') id: number) {
    const actorRepo = this.dataSource.getRepository(Szinesz);
    await actorRepo.delete(id);
  }
}
