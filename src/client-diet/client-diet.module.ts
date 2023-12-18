import { Module } from '@nestjs/common';
import { ClientDietController } from './client-diet.controller';
import { ClientDietService } from './client-diet.service';
import { ClientDietRepository } from './client-diet.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientDiet, ClientDietSchema } from './client-diet.schema';
import { ClientDietListener } from './client-diet.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientDiet.name, schema: ClientDietSchema },
    ]),
  ],
  controllers: [ClientDietController],
  providers: [ClientDietService, ClientDietRepository, ClientDietListener],
})
export class ClientDietModule {}
