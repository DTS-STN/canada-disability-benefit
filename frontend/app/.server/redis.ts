/**
 * This module provides a singleton Redis client instance for the application.
 * It configures and manages the connection to a Redis server, supporting both
 * standalone and sentinel modes. The client is initialized with settings from
 * the server environment variables and includes error handling and connection
 * management. It uses the `node-redis` library for Redis interaction.
 */
import { createClient } from 'redis';
import * as r from 'redis-sentinel-client';

import { serverEnvironment } from '~/.server/environment';
import { LogFactory } from '~/.server/logging';
import { singleton } from '~/.server/utils/instance-registry';

const log = LogFactory.getLogger(import.meta.url);

/**
 * Retrieves the application's redis client instance.
 * If the client does not exist, it initializes a new one.
 */
export function getRedisClient() {
  const {
    REDIS_CONNECTION_TYPE,
    REDIS_COMMAND_TIMEOUT_SECONDS, //
    REDIS_HOST,
    REDIS_PASSWORD,
    REDIS_PORT,
    REDIS_SENTINEL_MASTER_NAME,
    REDIS_USERNAME,
  } = serverEnvironment;

  const redisPassword = REDIS_PASSWORD?.value();
  const redisCommandTimeout = REDIS_COMMAND_TIMEOUT_SECONDS * 1000;

  const retryStrategy = (times: number): number => {
    // exponential backoff starting at 250ms to a maximum of 5s
    const retryIn = Math.min(250 * Math.pow(2, times - 1), 5000);
    log.error('Could not connect to Redis (attempt #%s); retry in %s ms', times, retryIn);
    return retryIn;
  };

  return singleton('redisClient', async () => {
    log.info('Creating new redis client');

    switch (serverEnvironment.REDIS_CONNECTION_TYPE) {
      case 'standalone': {
        const client = createClient({
          username: REDIS_USERNAME,
          password: redisPassword,
          socket: {
            host: REDIS_HOST,
            port: REDIS_PORT,
            socketTimeout: redisCommandTimeout,
            reconnectStrategy: retryStrategy,
          },
        });
        await client.connect();

        client
          .on('ready', () => log.info('Connected to %s://%s:%s/', REDIS_CONNECTION_TYPE, REDIS_HOST, REDIS_PORT))
          .on('error', (error) => log.error('Redis client error: %s', error.message));

        return client;
      }

      case 'sentinel': {
        const sentinelClient = r.createClient({
          masterName: REDIS_SENTINEL_MASTER_NAME,
          sentinels: [{ host: REDIS_HOST, port: REDIS_PORT }],
          masterOptions: {
            username: REDIS_USERNAME,
            password: redisPassword,
            commandTimeout: redisCommandTimeout,
            retryStrategy,
          },
        });
        sentinelClient
          .on('error', (error: string) => log.error('Redis client error: %s', error))
          .on('sentinel connected', () => log.info('Connected to %s', REDIS_CONNECTION_TYPE));

        return sentinelClient;
      }
    }
  });
}
