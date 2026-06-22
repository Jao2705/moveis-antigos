import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdateMovelDto {
  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  restaurado: boolean;

  @ApiPropertyOptional({ example: 200 })
  @IsNumber()
  @Min(10)
  horasHomem: number;
}
