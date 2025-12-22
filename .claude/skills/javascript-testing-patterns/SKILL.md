---
name: javascript-testing-patterns
description: Implement comprehensive testing strategies using Jest, Vitest, and Testing Library for unit tests, integration tests, and end-to-end testing with mocking, fixtures, and test-driven development. Use when writing JavaScript/TypeScript tests, setting up test infrastructure, or implementing TDD/BDD workflows.
---

# JavaScript Testing Patterns

This skill provides comprehensive patterns for testing JavaScript/TypeScript applications using modern testing frameworks and best practices.

## Framework Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  verbose: true
};
```

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'dist', '**/*.d.ts']
    },
    setupFiles: ['./vitest.setup.ts'],
    mockReset: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

## Unit Testing Patterns

### Testing Pure Functions

```typescript
// calculator.ts
export const add = (a: number, b: number): number => a + b;
export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

// calculator.test.ts
import { describe, it, expect } from 'vitest';
import { add, divide } from './calculator';

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-1, 1)).toBe(0);
    });

    it('should handle decimal numbers', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });
});
```

### Testing Classes

```typescript
// user-service.ts
export class UserService {
  private users: Map<string, User> = new Map();

  createUser(data: CreateUserDTO): User {
    if (!data.email.includes('@')) {
      throw new ValidationError('Invalid email');
    }
    const user = { id: crypto.randomUUID(), ...data };
    this.users.set(user.id, user);
    return user;
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }
}

// user-service.test.ts
describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  describe('createUser', () => {
    it('should create a user with valid data', () => {
      const user = service.createUser({
        email: 'test@example.com',
        name: 'Test User'
      });

      expect(user).toMatchObject({
        email: 'test@example.com',
        name: 'Test User'
      });
      expect(user.id).toBeDefined();
    });

    it('should throw ValidationError for invalid email', () => {
      expect(() => service.createUser({
        email: 'invalid',
        name: 'Test'
      })).toThrow(ValidationError);
    });
  });

  describe('getUser', () => {
    it('should return user by id', () => {
      const created = service.createUser({
        email: 'test@example.com',
        name: 'Test'
      });

      const found = service.getUser(created.id);
      expect(found).toEqual(created);
    });

    it('should return undefined for non-existent id', () => {
      expect(service.getUser('non-existent')).toBeUndefined();
    });
  });
});
```

### Testing Async Functions

```typescript
// api-client.ts
export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new ApiError(`User not found: ${id}`);
  }
  return response.json();
}

// api-client.test.ts
describe('fetchUser', () => {
  it('should return user data on success', async () => {
    const mockUser = { id: '1', name: 'Test' };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser)
    });

    const user = await fetchUser('1');
    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });

  it('should throw ApiError on failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404
    });

    await expect(fetchUser('999')).rejects.toThrow(ApiError);
  });
});
```

## Mocking Patterns

### Module Mocking

```typescript
// With Jest
jest.mock('./database', () => ({
  query: jest.fn(),
  connect: jest.fn()
}));

// With Vitest
vi.mock('./database', () => ({
  query: vi.fn(),
  connect: vi.fn()
}));

// In test file
import { query } from './database';

beforeEach(() => {
  vi.mocked(query).mockReset();
});

it('should call database query', async () => {
  vi.mocked(query).mockResolvedValue([{ id: 1 }]);

  const result = await service.findAll();

  expect(query).toHaveBeenCalledWith('SELECT * FROM users');
  expect(result).toHaveLength(1);
});
```

### Spy Functions

```typescript
describe('EventEmitter', () => {
  it('should call listener when event is emitted', () => {
    const emitter = new EventEmitter();
    const listener = vi.fn();

    emitter.on('test', listener);
    emitter.emit('test', { data: 'value' });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ data: 'value' });
  });
});
```

### Partial Mocking

```typescript
// Mock only specific exports
vi.mock('./utils', async () => {
  const actual = await vi.importActual('./utils');
  return {
    ...actual,
    // Only mock this function
    expensiveOperation: vi.fn().mockReturnValue('mocked')
  };
});
```

### Time Mocking

```typescript
describe('Timer functions', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce function calls', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced();
    debounced();
    debounced();

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle setTimeout', () => {
    const callback = vi.fn();

    setTimeout(callback, 1000);

    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalled();
  });
});
```

## Integration Testing Patterns

### API Testing with Supertest

```typescript
// app.test.ts
import request from 'supertest';
import { app } from './app';
import { prisma } from './database';

describe('User API', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'test@example.com',
          name: 'Test User'
        })
        .expect(201);

      expect(response.body).toMatchObject({
        email: 'test@example.com',
        name: 'Test User'
      });
      expect(response.body.id).toBeDefined();
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'invalid',
          name: 'Test'
        })
        .expect(400);

      expect(response.body.error).toBe('Invalid email');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      // Arrange
      const user = await prisma.user.create({
        data: { email: 'test@example.com', name: 'Test' }
      });

      // Act
      const response = await request(app)
        .get(`/api/users/${user.id}`)
        .expect(200);

      // Assert
      expect(response.body).toMatchObject({
        id: user.id,
        email: 'test@example.com'
      });
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/non-existent-id')
        .expect(404);
    });
  });
});
```

### Database Integration Tests

```typescript
// Using test containers
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';

describe('Database Integration', () => {
  let container: PostgreSqlContainer;
  let prisma: PrismaClient;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();

    process.env.DATABASE_URL = container.getConnectionUri();
    prisma = new PrismaClient();

    // Run migrations
    await execAsync('npx prisma migrate deploy');
  }, 60000);

  afterAll(async () => {
    await prisma.$disconnect();
    await container.stop();
  });

  it('should persist and retrieve data', async () => {
    const created = await prisma.user.create({
      data: { email: 'test@example.com', name: 'Test' }
    });

    const found = await prisma.user.findUnique({
      where: { id: created.id }
    });

    expect(found).toEqual(created);
  });
});
```

## React Component Testing

### Testing with React Testing Library

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should show loading state', () => {
    render(<Button loading>Submit</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
```

### Testing Hooks

```typescript
// useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });
});
```

### Testing with Context

```typescript
// TestWrapper.tsx
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={testTheme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

// Usage in tests
const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestWrapper });
};

it('should use theme from context', () => {
  renderWithProviders(<ThemedComponent />);

  expect(screen.getByTestId('themed')).toHaveStyle({ color: 'blue' });
});
```

## Test Data Management

### Factories with Faker

```typescript
// factories/user.factory.ts
import { faker } from '@faker-js/faker';

interface UserFactoryOptions {
  email?: string;
  name?: string;
  role?: 'admin' | 'user';
}

export const createUser = (options: UserFactoryOptions = {}): User => ({
  id: faker.string.uuid(),
  email: options.email ?? faker.internet.email(),
  name: options.name ?? faker.person.fullName(),
  role: options.role ?? 'user',
  createdAt: faker.date.past()
});

export const createUsers = (count: number, options?: UserFactoryOptions): User[] =>
  Array.from({ length: count }, () => createUser(options));

// Usage in tests
describe('UserList', () => {
  it('should render list of users', () => {
    const users = createUsers(5);

    render(<UserList users={users} />);

    users.forEach(user => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });
});
```

### Fixtures

```typescript
// fixtures/orders.fixture.ts
export const pendingOrder: Order = {
  id: 'order-1',
  status: 'pending',
  items: [
    { productId: 'prod-1', quantity: 2, price: 10.00 }
  ],
  total: 20.00
};

export const completedOrder: Order = {
  id: 'order-2',
  status: 'completed',
  items: [
    { productId: 'prod-2', quantity: 1, price: 50.00 }
  ],
  total: 50.00
};

// Usage
import { pendingOrder, completedOrder } from './fixtures/orders.fixture';

it('should show pending badge for pending orders', () => {
  render(<OrderCard order={pendingOrder} />);
  expect(screen.getByText('Pending')).toBeInTheDocument();
});
```

## Snapshot Testing

```typescript
describe('Component Snapshots', () => {
  it('should match snapshot', () => {
    const { container } = render(<Card title="Test" content="Content" />);

    expect(container).toMatchSnapshot();
  });

  it('should match inline snapshot', () => {
    const { container } = render(<Badge type="success">Done</Badge>);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span class="badge badge-success">Done</span>"`
    );
  });
});
```

## Test Organization

### AAA Pattern (Arrange-Act-Assert)

```typescript
describe('OrderService', () => {
  it('should calculate total with discount', () => {
    // Arrange
    const items = [
      { productId: '1', quantity: 2, price: 10 },
      { productId: '2', quantity: 1, price: 20 }
    ];
    const discount = 0.1; // 10%

    // Act
    const total = orderService.calculateTotal(items, discount);

    // Assert
    expect(total).toBe(36); // (20 + 20) * 0.9
  });
});
```

### Test Isolation

```typescript
describe('Database operations', () => {
  // Reset database before each test
  beforeEach(async () => {
    await db.query('TRUNCATE TABLE users CASCADE');
  });

  // Clean up after all tests
  afterAll(async () => {
    await db.end();
  });

  it('test 1', async () => {
    // Each test starts with clean database
  });

  it('test 2', async () => {
    // Independent of test 1
  });
});
```

## Best Practices Checklist

### Test Quality
- [ ] Follow AAA pattern (Arrange-Act-Assert)
- [ ] One assertion concept per test
- [ ] Descriptive test names (should...when...)
- [ ] Test behavior, not implementation
- [ ] Test edge cases and error paths

### Coverage Goals
- [ ] 80%+ line coverage
- [ ] 80%+ branch coverage
- [ ] 100% coverage for critical paths
- [ ] Don't test trivial code (getters/setters)

### Performance
- [ ] Mock external dependencies
- [ ] Use beforeEach for common setup
- [ ] Parallelize tests where possible
- [ ] Use test containers for integration tests

### Maintainability
- [ ] Use factories for test data
- [ ] Extract common test utilities
- [ ] Keep tests close to source files
- [ ] Clean up after tests

## TRD Document Sections

When documenting testing strategy in TRD:

1. **Testing Framework**: Jest/Vitest choice with rationale
2. **Test Categories**: Unit, integration, E2E breakdown
3. **Coverage Requirements**: Minimum thresholds per layer
4. **Mocking Strategy**: What to mock, what to test real
5. **Test Data**: Factories, fixtures, test databases
6. **CI Integration**: When tests run, parallelization
7. **Performance Testing**: Load tests, benchmarks
8. **Visual Regression**: Screenshot testing approach
9. **Accessibility Testing**: a11y testing tools
10. **Test Environment**: Setup requirements, containers
