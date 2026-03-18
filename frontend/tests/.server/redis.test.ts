import { createClient } from 'redis';
import * as r from 'redis-sentinel-client';
import { describe, expect, it, vi } from 'vitest';

import { serverEnvironment } from '~/.server/environment';
import { getRedisClient } from '~/.server/redis';

vi.mock('redis', () => {
  return {
    createClient: vi.fn().mockImplementation(() => ({
      on: vi.fn().mockReturnThis(),
      connect: vi.fn(),
    })),
  };
});

vi.mock('redis-sentinel-client', () => {
  return {
    createClient: vi.fn().mockImplementation(() => ({
      on: vi.fn().mockReturnThis(),
    })),
  };
});

vi.mock('~/.server/environment', () => ({
  serverEnvironment: {
    REDIS_CONNECTION_TYPE: undefined, // set in each test
    REDIS_HOST: 'localhost',
    REDIS_PORT: 6379,
    REDIS_PASSWORD: { value: () => 'password' },
    REDIS_USERNAME: 'user',
    REDIS_SENTINEL_MASTER_NAME: 'mymaster',
    REDIS_COMMAND_TIMEOUT_SECONDS: 10,
  },
}));

vi.mock('~/.server/utils/instance-registry', () => ({
  singleton: vi.fn((_, factory) => factory()),
}));

describe('Redis Client Initialization', () => {
  describe('getRedisClient', () => {
    it('should create a Redis client in standalone mode', async () => {
      vi.mocked(serverEnvironment).REDIS_CONNECTION_TYPE = 'standalone';

      const redisClient = await getRedisClient();

      expect(createClient).toHaveBeenCalledWith({
        username: 'user',
        password: 'password',
        socket: {
          host: 'localhost',
          port: 6379,
          socketTimeout: 10000,
          reconnectStrategy: expect.any(Function),
        },
      });

      expect(redisClient.on).toHaveBeenCalledWith('ready', expect.any(Function));
      expect(redisClient.on).toHaveBeenCalledWith('error', expect.any(Function));
    });

    it('should create a Redis client in sentinel mode', async () => {
      vi.mocked(serverEnvironment).REDIS_CONNECTION_TYPE = 'sentinel';

      const redisClient = await getRedisClient();

      expect(r.createClient).toHaveBeenCalledWith({
        masterName: 'mymaster',
        sentinels: [{ host: 'localhost', port: 6379 }],
        masterOptions: {
          username: 'user',
          password: 'password',
          commandTimeout: 10000,
          retryStrategy: expect.any(Function),
        },
      });

      expect(redisClient.on).toHaveBeenCalledWith('sentinel connected', expect.any(Function));
      expect(redisClient.on).toHaveBeenCalledWith('error', expect.any(Function));
    });
  });
});
