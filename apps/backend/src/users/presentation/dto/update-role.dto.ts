import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ example: 'admin', enum: ['admin', 'user'] })
  @IsNotEmpty()
  @IsEnum(['admin', 'user'])
  role: 'admin' | 'user';
}
