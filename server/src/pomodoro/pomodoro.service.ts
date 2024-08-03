import { PrismaService } from '../ prisma.service';
import { NotFoundException } from '@nestjs/common';
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/pomodoro.dto';

export default class PomodoroService {
  constructor(private prisma: PrismaService) {}

  public async getTodaySession(userId: string): Promise<any> {
    const today = new Date().toISOString().split('T')[0];

    return this.prisma.pomodoroSession.findFirst({
      where: {
        createdAt: {
          gte: new Date(today),
        },
        userId,
      },
      include: {
        rounds: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  public async create(userId: string) {
    const todaySession = await this.getTodaySession(userId);

    if (todaySession) return todaySession;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        intervalsCount: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return this.prisma.pomodoroSession.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({ length: user.intervalsCount }, () => ({
              totalSeconds: 0,
            })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        rounds: true,
      },
    });
  }

  public async update(
    dto: Partial<PomodoroSessionDto>,
    pomodoroId: string,
    userId: string,
  ) {
    return this.prisma.pomodoroSession.update({
      where: {
        userId,
        id: pomodoroId,
      },
      data: dto,
    });
  }

  public async updateRound(dto: Partial<PomodoroRoundDto>, roundId: string) {
    return this.prisma.pomodoroRound.update({
      where: {
        id: roundId,
      },
      data: dto,
    });
  }

  public async deleteSession(sessionId: string, userId: string) {
    return this.prisma.pomodoroSession.delete({
      where: {
        id: sessionId,
        userId,
      },
    });
  }
}
