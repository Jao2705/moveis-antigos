import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrdemServicoDto {
  @ApiProperty({ example: 1, description: 'ID do ateliê' })
  @IsNotEmpty()
  @IsNumber()
  atelie_id: number;

  @ApiProperty({ example: null, required: false, description: 'ID do móvel (opcional)' })
  @IsOptional()
  @IsNumber()
  movel_id?: number | null;

  @ApiProperty({ example: 'Cadeira com perna quebrada', description: 'Descrição do problema' })
  @IsNotEmpty()
  @IsString()
  descricao_problema: string;

  @ApiProperty({ example: 'cadeira', description: 'Tipo do móvel informado pelo cliente' })
  @IsOptional()
  @IsString()
  tipo_movel_informado?: string;
}
