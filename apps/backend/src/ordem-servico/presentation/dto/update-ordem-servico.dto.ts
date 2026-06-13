import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrdemServicoDto {
  @ApiProperty({
    example: 'em_orcamento',
    enum: ['solicitado', 'em_orcamento', 'aprovado', 'em_reparo', 'concluido', 'cancelado'],
  })
  @IsNotEmpty()
  @IsEnum(['solicitado', 'em_orcamento', 'aprovado', 'em_reparo', 'concluido', 'cancelado'])
  status: 'solicitado' | 'em_orcamento' | 'aprovado' | 'em_reparo' | 'concluido' | 'cancelado';

  @ApiProperty({ example: 'Cadeira com perna quebrada' })
  @IsNotEmpty()
  @IsString()
  descricao_problema: string;

  @ApiProperty({ example: 'cadeira' })
  @IsOptional()
  @IsString()
  tipo_movel_informado?: string;

  @ApiProperty({ example: '2026-07-15', required: false })
  @IsOptional()
  data_previsao_entrega?: string | null;

  @ApiProperty({ example: 350.0, required: false })
  @IsOptional()
  @IsNumber()
  valor_orcamento?: number | null;
}
