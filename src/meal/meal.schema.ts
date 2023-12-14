import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { ITEM_UNITS_ENUM, MACRO_TYPES } from './meal.constants';

@Schema({ versionKey: false, timestamps: false, _id: false })
export class Macro {
  @Prop({ required: true, enum: MACRO_TYPES })
  type: MACRO_TYPES;

  @Prop({ required: true })
  value: number;
}

export const MarcoSchema = SchemaFactory.createForClass(Macro);

@Schema({ versionKey: false, timestamps: false, _id: false })
class Item {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: String, enum: ITEM_UNITS_ENUM })
  unit: ITEM_UNITS_ENUM;
}

const ItemSchema = SchemaFactory.createForClass(Item);

export type MealDocument = HydratedDocument<Meal>;

@Schema({ versionKey: false, timestamps: true, strict: true })
export class Meal {
  @ApiProperty({ type: 'string' })
  _id?: ObjectId;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  trainer: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  notes?: string;

  @Prop({ type: [MarcoSchema] })
  macros?: Macro[];

  @Prop({ type: [ItemSchema], required: true })
  items: Item[];
}

export const MealSchema = SchemaFactory.createForClass(Meal);
