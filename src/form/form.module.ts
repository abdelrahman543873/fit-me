import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { FormRepository } from './form.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './form.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
  ],
  providers: [FormService, FormRepository],
  controllers: [FormController],
})
export class FormModule {}
