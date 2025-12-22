---
name: microservices-patterns
description: Design microservices architectures with service boundaries, event-driven communication, and resilience patterns. Use when building distributed systems, decomposing monoliths, or implementing microservices.
---

# Microservices Architecture Patterns

This skill provides comprehensive guidance for designing distributed systems through microservices architecture, including service boundaries, communication patterns, data management, and resilience strategies.

## Core Decomposition Strategies

### Business Capability Approach
Organize services around business functions:
- **OrderService**: Handles order lifecycle management
- **PaymentService**: Processes payments and refunds
- **InventoryService**: Manages stock levels and reservations
- **UserService**: Handles authentication and user profiles
- **NotificationService**: Manages email, SMS, push notifications

### Domain-Driven Design (DDD)
Map bounded contexts to individual services:
- Identify core, supporting, and generic subdomains
- Define clear aggregate boundaries
- Each bounded context owns its domain model
- Use context mapping for inter-service communication

### Strangler Fig Pattern
Incrementally extract functionality from monoliths:
1. Identify a seam in the monolith
2. Create new service for extracted functionality
3. Route requests through proxy layer
4. Gradually migrate traffic to new service
5. Deprecate old code path

## Communication Patterns

### Synchronous Communication

**REST APIs**
```
GET    /api/v1/orders/{id}       # Read
POST   /api/v1/orders            # Create
PUT    /api/v1/orders/{id}       # Update
DELETE /api/v1/orders/{id}       # Delete
PATCH  /api/v1/orders/{id}       # Partial update
```

**gRPC**
- Use for high-performance internal communication
- Define contracts with Protocol Buffers
- Supports streaming (unary, server, client, bidirectional)
- Built-in code generation for multiple languages

**GraphQL**
- Single endpoint for flexible queries
- Client specifies exact data requirements
- Reduces over-fetching and under-fetching
- Use for BFF (Backend for Frontend) layer

### Asynchronous Communication

**Event Streaming (Kafka)**
- Event sourcing for audit trails
- Topics partitioned for scalability
- Consumer groups for parallel processing
- Retention policies for replay capability

**Message Queues (RabbitMQ, SQS)**
- Point-to-point communication
- Work queue pattern for load distribution
- Dead letter queues for failed messages
- TTL and retry policies

**Pub/Sub Architecture**
- Loose coupling between publishers and subscribers
- Topic-based routing
- Fan-out pattern for notifications
- Event filtering at subscriber level

## Key Architecture Patterns

### API Gateway Pattern
Central entry point for all client requests:
- Request routing and load balancing
- Authentication and authorization
- Rate limiting and throttling
- Request/response transformation
- Circuit breaking for backend services
- API composition and aggregation

### Saga Pattern
Manages distributed transactions:

**Choreography-based Saga**
```
Order Created → Payment Processed → Inventory Reserved → Order Confirmed
     ↓ (if fails)
Order Cancelled ← Payment Refunded ← Inventory Released
```

**Orchestration-based Saga**
- Central orchestrator coordinates steps
- Easier to understand and debug
- Single point of failure consideration
- Compensating transactions for rollback

### Circuit Breaker Pattern
Prevents cascade failures:
- **Closed**: Normal operation, requests pass through
- **Open**: Failures exceeded threshold, requests fail fast
- **Half-Open**: Test if service recovered

```
Circuit Breaker States:
┌─────────┐  failure threshold  ┌──────┐
│ Closed  │ ──────────────────→ │ Open │
└─────────┘                     └──────┘
     ↑                              │
     │ success                      │ timeout
     │                              ↓
     │                        ┌───────────┐
     └─────────────────────── │ Half-Open │
            success           └───────────┘
```

### Event-Driven Architecture
Services communicate through domain events:
- Events are immutable facts
- Services react to events independently
- Reduced temporal coupling
- Natural audit trail

**Event Structure**
```json
{
  "eventId": "uuid",
  "eventType": "OrderCreated",
  "aggregateId": "order-123",
  "timestamp": "ISO-8601",
  "version": 1,
  "payload": { ... },
  "metadata": {
    "correlationId": "uuid",
    "causationId": "uuid"
  }
}
```

### CQRS (Command Query Responsibility Segregation)
Separate read and write models:
- **Command side**: Handles writes, enforces business rules
- **Query side**: Optimized read models, denormalized views
- Event sourcing compatible
- Independent scaling of read/write workloads

## Data Management

### Database per Service
Each service maintains its own database:
- No shared databases between services
- Independent schema evolution
- Technology freedom (SQL, NoSQL, etc.)
- Data isolation and autonomy

### Data Consistency Patterns

**Eventual Consistency**
- Accept temporary inconsistency
- Converge to consistent state over time
- Use compensation for conflicts

**Outbox Pattern**
- Write events to outbox table in same transaction
- Background process publishes to message broker
- Guarantees at-least-once delivery

**Change Data Capture (CDC)**
- Capture database changes as events
- Tools: Debezium, Maxwell
- Real-time data synchronization

## Resilience Strategies

### Retry with Exponential Backoff
```
Attempt 1: Immediate
Attempt 2: Wait 1 second
Attempt 3: Wait 2 seconds
Attempt 4: Wait 4 seconds
Attempt 5: Wait 8 seconds (max)
```

Add jitter to prevent thundering herd.

### Bulkhead Isolation
- Isolate resources per service/function
- Thread pool isolation
- Connection pool limits
- Prevents resource exhaustion cascade

### Health Checks
- **Liveness**: Is the service running?
- **Readiness**: Is the service ready to accept traffic?
- **Startup**: Has the service completed initialization?

### Timeout Management
- Set appropriate timeouts for all external calls
- Timeout < circuit breaker threshold
- Consider downstream service SLAs
- Implement deadline propagation

## Service Mesh Considerations

### Sidecar Proxy Pattern
- Traffic management (load balancing, routing)
- Security (mTLS, authorization)
- Observability (metrics, tracing, logging)
- Tools: Istio, Linkerd, Consul Connect

### Service Discovery
- Client-side vs server-side discovery
- DNS-based discovery
- Registry-based (Consul, Eureka, etcd)
- Kubernetes native service discovery

## Anti-Patterns to Avoid

### Distributed Monolith
- Services tightly coupled through synchronous calls
- Shared databases between services
- Coordinated deployments required

### Chatty Communication
- Excessive inter-service calls
- Consider data denormalization
- Use batch APIs where appropriate

### Missing Circuit Breakers
- Cascade failures across services
- Always protect external dependencies
- Monitor and alert on circuit state

### Premature Decomposition
- Start with monolith for new domains
- Extract services when boundaries are clear
- Don't microservice everything

### Insufficient Compensation Logic
- Every action needs a compensating action
- Test failure scenarios thoroughly
- Monitor saga completion rates

## Observability Requirements

### Distributed Tracing
- Propagate correlation IDs
- Trace spans across service boundaries
- Tools: Jaeger, Zipkin, AWS X-Ray

### Centralized Logging
- Structured JSON logs
- Include correlation IDs
- Log aggregation (ELK, Loki)

### Metrics Collection
- RED metrics: Rate, Errors, Duration
- USE metrics: Utilization, Saturation, Errors
- Business metrics per service

## TRD/Architecture Document Sections

When documenting microservices architecture, include:

1. **Service Catalog**: List all services with responsibilities
2. **Communication Matrix**: How services interact
3. **Data Ownership**: Which service owns which data
4. **Event Catalog**: Published and consumed events
5. **SLA Requirements**: Latency, availability targets
6. **Failure Modes**: What happens when X fails
7. **Scaling Strategy**: How each service scales
8. **Deployment Topology**: Infrastructure requirements
