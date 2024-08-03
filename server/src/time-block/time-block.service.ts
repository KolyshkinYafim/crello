import { PrismaService } from '../ prisma.service';
import { TimeBlockDto } from './dto/time-block.dto';

export class TimeBlockService {
  constructor(private prisma: PrismaService) {}

  public async getAll(userId: string) {
    return this.prisma.timeBlock.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  public async create(dto: TimeBlockDto, userId: string) {
    return this.prisma.timeBlock.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async update(
    dto: Partial<TimeBlockDto>,
    timeBlockId: string,
    userId: string,
  ) {
    return this.prisma.timeBlock.update({
      where: {
        userId,
        id: timeBlockId,
      },
      data: dto,
    });
  }

  public async delete(timeBlockId: string, userId: string) {
    return this.prisma.timeBlock.delete({
      where: {
        id: timeBlockId,
        userId,
      },
    });
  }

  public async updateOrder(ids: string[]) {
    return this.prisma.$transaction(
      ids.map((id: string, order: number) =>
        this.prisma.timeBlock.update({
          where: { id },
          data: { order },
        }),
      ),
    );
  }
}
