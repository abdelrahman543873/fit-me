import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './client.schema';
import { ClientController } from './client.controller';
import { ClientListener } from './client.listener';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';
import { ExistingClientValidator } from './validators/existing-client.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [
    ClientListener,
    ClientService,
    ClientRepository,
    ExistingClientValidator,
  ],
})
export class ClientModule {}
