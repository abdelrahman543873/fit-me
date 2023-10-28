import { Body, Controller, Post, Request } from '@nestjs/common';
import { FormService } from './form.service';
import { AddFormDto } from './inputs/add-form.dto';
import { RequestContext } from '../../dist/shared/interfaces/request-context.interface';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  async addForm(
    @Request() request: RequestContext,
    @Body() addFormDto: AddFormDto,
  ) {
    return await this.formService.addForm(request.user._id, addFormDto);
  }
}
