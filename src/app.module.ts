import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CardsModule } from './modules/cards/cards.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PrismaService } from './config/prisma.service';
import { CorrelationMiddleware } from './common/middleware/correlation.middleware';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [
    AuthModule,
    CardsModule,
    PaymentsModule,
    MetricsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}