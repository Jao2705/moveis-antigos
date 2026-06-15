import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ActivateUserDto {
  @ApiProperty({ example: true })
  @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso.' })
  ativo: boolean;
}
