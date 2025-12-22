---
name: nodejs-backend-patterns
description: Build production-ready Node.js backend services with Express/Fastify, implementing middleware patterns, error handling, authentication, database integration, and API design best practices. Use when creating Node.js servers, REST APIs, GraphQL backends, or microservices.
---

# Node.js Backend Patterns

This skill provides comprehensive patterns for building production-ready Node.js backend services using Express/Fastify frameworks.

## Framework Selection

### Express.js
Best for: Flexibility, large ecosystem, simple APIs

```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));

// Performance middleware
app.use(compression());

// Parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));
```

### Fastify
Best for: High performance, built-in validation, TypeScript support

```javascript
const fastify = require('fastify')({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: { colorize: true }
    }
  }
});

// Schema validation built-in
fastify.route({
  method: 'POST',
  url: '/users',
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' }
        }
      }
    }
  },
  handler: async (request, reply) => {
    // Handler implementation
  }
});
```

## Project Structure (Layered Architecture)

```
src/
├── config/
│   ├── index.js          # Configuration loader
│   ├── database.js       # Database config
│   └── logger.js         # Logger config
├── controllers/
│   ├── userController.js
│   └── orderController.js
├── services/
│   ├── userService.js
│   └── orderService.js
├── repositories/
│   ├── userRepository.js
│   └── orderRepository.js
├── models/
│   ├── User.js
│   └── Order.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   ├── errorHandler.js
│   └── rateLimiter.js
├── routes/
│   ├── index.js
│   ├── userRoutes.js
│   └── orderRoutes.js
├── utils/
│   ├── errors.js
│   ├── response.js
│   └── validators.js
└── app.js
```

## Dependency Injection

```javascript
// container.js
class Container {
  constructor() {
    this.services = new Map();
  }

  register(name, factory) {
    this.services.set(name, { factory, instance: null });
  }

  resolve(name) {
    const service = this.services.get(name);
    if (!service) throw new Error(`Service ${name} not found`);

    if (!service.instance) {
      service.instance = service.factory(this);
    }
    return service.instance;
  }
}

const container = new Container();

// Register services
container.register('db', () => new Database(config.database));
container.register('userRepository', (c) => new UserRepository(c.resolve('db')));
container.register('userService', (c) => new UserService(c.resolve('userRepository')));
container.register('userController', (c) => new UserController(c.resolve('userService')));

module.exports = container;
```

## Middleware Patterns

### Authentication Middleware (JWT)

```javascript
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Missing authentication token');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    next(new UnauthorizedError('Invalid token'));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }
    next();
  };
};

// Usage
router.get('/admin', authenticate, authorize('admin'), adminController.dashboard);
```

### Validation Middleware (Zod)

```javascript
const { z } = require('zod');

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });

      req.validated = validated;
      next();
    } catch (error) {
      next(new ValidationError(error.errors));
    }
  };
};

// Schema definition
const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    name: z.string().min(2).max(50)
  })
});

// Usage
router.post('/users', validate(createUserSchema), userController.create);
```

### Rate Limiting Middleware

```javascript
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

const rateLimiter = (options = {}) => {
  const {
    windowMs = 60000,      // 1 minute
    max = 100,             // requests per window
    keyGenerator = (req) => req.ip,
    message = 'Too many requests'
  } = options;

  return async (req, res, next) => {
    const key = `rate_limit:${keyGenerator(req)}`;

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.pexpire(key, windowMs);
    }

    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, max - current));

    if (current > max) {
      return res.status(429).json({ error: message });
    }

    next();
  };
};

// Usage
app.use('/api', rateLimiter({ windowMs: 60000, max: 100 }));
```

### Request Logging Middleware

```javascript
const logger = require('./config/logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const requestId = req.headers['x-request-id'] || uuidv4();

  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);

  res.on('finish', () => {
    logger.info({
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: Date.now() - start,
      userAgent: req.headers['user-agent'],
      ip: req.ip
    });
  });

  next();
};
```

## Error Handling

### Custom Error Classes

```javascript
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409, 'CONFLICT');
  }
}
```

### Global Error Handler

```javascript
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error({
    requestId: req.requestId,
    error: {
      message: err.message,
      stack: err.stack,
      code: err.code
    }
  });

  // Operational errors (expected)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.errors && { details: err.errors })
      }
    });
  }

  // Programming errors (unexpected)
  // Don't leak details in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message
    }
  });
};

// Must be last middleware
app.use(errorHandler);
```

## Database Integration

### PostgreSQL with Connection Pooling

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,                    // Max connections
  idleTimeoutMillis: 30000,   // Close idle connections after 30s
  connectionTimeoutMillis: 2000
});

// Query helper
const query = async (text, params) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  logger.debug({
    query: text,
    duration: Date.now() - start,
    rows: result.rowCount
  });
  return result;
};

// Transaction helper
const transaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
```

### MongoDB with Mongoose

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });
};

// Model example
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);
```

## Authentication & Security

### JWT with Refresh Tokens

```javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = crypto.randomBytes(40).toString('hex');

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken) => {
  const storedToken = await TokenRepository.findByRefreshToken(refreshToken);

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new UnauthorizedError('Invalid refresh token');
  }

  const user = await UserRepository.findById(storedToken.userId);
  const tokens = generateTokens(user);

  // Rotate refresh token
  await TokenRepository.update(storedToken.id, {
    refreshToken: tokens.refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  });

  return tokens;
};
```

### Password Hashing

```javascript
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
```

## Caching Patterns

### Redis Caching with Decorator

```javascript
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

const cache = (keyPrefix, ttlSeconds = 3600) => {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const cacheKey = `${keyPrefix}:${JSON.stringify(args)}`;

      // Try cache first
      const cached = await redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Store in cache
      await redis.setex(cacheKey, ttlSeconds, JSON.stringify(result));

      return result;
    };

    return descriptor;
  };
};

// Cache invalidation helper
const invalidateCache = async (pattern) => {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};
```

## Response Standardization

### Success Response Helper

```javascript
const successResponse = (res, data, statusCode = 200, meta = {}) => {
  return res.status(statusCode).json({
    success: true,
    data,
    ...meta
  });
};

const paginatedResponse = (res, data, pagination) => {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit),
      hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
      hasPrev: pagination.page > 1
    }
  });
};

// Usage in controller
const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { users, total } = await userService.findAll({ page, limit });

    paginatedResponse(res, users, { page, limit, total });
  } catch (error) {
    next(error);
  }
};
```

## Health Check Endpoints

```javascript
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/health/ready', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    externalApi: await checkExternalApi()
  };

  const allHealthy = Object.values(checks).every(c => c.healthy);

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'ready' : 'degraded',
    checks,
    timestamp: new Date().toISOString()
  });
});
```

## Graceful Shutdown

```javascript
const gracefulShutdown = async (signal) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new requests
  server.close(async () => {
    logger.info('HTTP server closed');

    // Close database connections
    await pool.end();
    logger.info('Database pool closed');

    // Close Redis connection
    await redis.quit();
    logger.info('Redis connection closed');

    process.exit(0);
  });

  // Force exit after timeout
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
```

## TRD Document Checklist

When documenting Node.js backend in TRD:

1. **Framework Choice**: Express vs Fastify with justification
2. **Authentication Strategy**: JWT, OAuth, sessions
3. **Database Selection**: SQL vs NoSQL, connection pooling
4. **Caching Strategy**: Redis patterns, cache invalidation
5. **Error Handling**: Error codes, logging strategy
6. **Rate Limiting**: Limits per endpoint, algorithm
7. **API Versioning**: URL path vs header versioning
8. **Validation**: Schema validation approach
9. **Security**: CORS, helmet, input sanitization
10. **Monitoring**: Health checks, metrics, logging
