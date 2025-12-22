---
name: gitlab-ci-patterns
description: Build GitLab CI/CD pipelines with multi-stage workflows, caching, and distributed runners for scalable automation. Use when implementing GitLab CI/CD, optimizing pipeline performance, or setting up automated testing and deployment.
---

# GitLab CI/CD Patterns

This skill provides comprehensive patterns for building GitLab CI/CD pipelines with multi-stage workflows, caching strategies, and distributed runner configurations.

## Basic Pipeline Structure

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - security
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

default:
  image: node:20-alpine
  tags:
    - docker
  before_script:
    - npm ci --cache .npm --prefer-offline

# Cache configuration
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - .npm/
    - node_modules/
```

## Build Stage Patterns

### Node.js Build

```yaml
build:
  stage: build
  script:
    - npm run build
    - npm run lint
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

### Docker Build & Push

```yaml
build-docker:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  variables:
    DOCKER_HOST: tcp://docker:2376
    DOCKER_TLS_VERIFY: 1
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - |
      if [ "$CI_COMMIT_BRANCH" == "$CI_DEFAULT_BRANCH" ]; then
        docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
        docker push $CI_REGISTRY_IMAGE:latest
      fi
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      changes:
        - Dockerfile
        - src/**/*
```

### Multi-Architecture Build

```yaml
build-multiarch:
  stage: build
  image: docker:24
  services:
    - docker:24-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker buildx create --use
  script:
    - docker buildx build
      --platform linux/amd64,linux/arm64
      --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
      --push .
```

## Test Stage Patterns

### Unit Tests with Coverage

```yaml
unit-test:
  stage: test
  script:
    - npm run test:unit -- --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      junit: junit.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
    expire_in: 1 week
```

### Integration Tests with Services

```yaml
integration-test:
  stage: test
  services:
    - name: postgres:15
      alias: db
    - name: redis:7
      alias: cache
  variables:
    POSTGRES_DB: test_db
    POSTGRES_USER: test_user
    POSTGRES_PASSWORD: test_password
    DATABASE_URL: postgresql://test_user:test_password@db:5432/test_db
    REDIS_URL: redis://cache:6379
  script:
    - npm run db:migrate
    - npm run test:integration
```

### Parallel Testing

```yaml
test:
  stage: test
  parallel: 4
  script:
    - npm run test -- --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL
```

### Matrix Testing

```yaml
test-matrix:
  stage: test
  parallel:
    matrix:
      - NODE_VERSION: ["18", "20", "22"]
        DATABASE: ["postgres", "mysql"]
  image: node:${NODE_VERSION}-alpine
  script:
    - npm run test:${DATABASE}
```

## Security Stage Patterns

### SAST (Static Application Security Testing)

```yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml

sast:
  stage: security
  variables:
    SAST_EXCLUDED_ANALYZERS: "spotbugs"
```

### Container Scanning

```yaml
include:
  - template: Security/Container-Scanning.gitlab-ci.yml

container_scanning:
  variables:
    CS_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

### Custom Security Scan (Trivy)

```yaml
trivy-scan:
  stage: security
  image:
    name: aquasec/trivy:latest
    entrypoint: [""]
  script:
    - trivy image
      --exit-code 1
      --severity HIGH,CRITICAL
      --ignore-unfixed
      $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  allow_failure: true
```

## Deploy Stage Patterns

### Multi-Environment Deployment

```yaml
.deploy_template: &deploy_template
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config set-cluster k8s --server="$KUBE_URL" --certificate-authority="$KUBE_CA_PEM"
    - kubectl config set-credentials deployer --token="$KUBE_TOKEN"
    - kubectl config set-context default --cluster=k8s --user=deployer --namespace=$KUBE_NAMESPACE
    - kubectl config use-context default
    - envsubst < k8s/deployment.yaml | kubectl apply -f -
    - kubectl rollout status deployment/$APP_NAME -n $KUBE_NAMESPACE

deploy-staging:
  <<: *deploy_template
  environment:
    name: staging
    url: https://staging.example.com
  variables:
    KUBE_NAMESPACE: staging
    APP_NAME: myapp
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

deploy-production:
  <<: *deploy_template
  environment:
    name: production
    url: https://example.com
  variables:
    KUBE_NAMESPACE: production
    APP_NAME: myapp
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      when: manual
  needs:
    - deploy-staging
```

### Blue-Green Deployment

```yaml
deploy-blue-green:
  stage: deploy
  script:
    - |
      CURRENT=$(kubectl get svc myapp -o jsonpath='{.spec.selector.version}')
      if [ "$CURRENT" == "blue" ]; then
        NEW_VERSION="green"
      else
        NEW_VERSION="blue"
      fi
    - kubectl set image deployment/myapp-$NEW_VERSION app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl rollout status deployment/myapp-$NEW_VERSION
    - kubectl patch svc myapp -p '{"spec":{"selector":{"version":"'$NEW_VERSION'"}}}'
  environment:
    name: production
```

### Canary Deployment

```yaml
deploy-canary:
  stage: deploy
  script:
    - kubectl set image deployment/myapp-canary app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl scale deployment/myapp-canary --replicas=1
    - kubectl rollout status deployment/myapp-canary
  environment:
    name: production-canary

promote-canary:
  stage: deploy
  script:
    - kubectl set image deployment/myapp app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl rollout status deployment/myapp
    - kubectl scale deployment/myapp-canary --replicas=0
  when: manual
  needs:
    - deploy-canary
  environment:
    name: production
```

## Infrastructure as Code

### Terraform Pipeline

```yaml
stages:
  - validate
  - plan
  - apply

variables:
  TF_ROOT: ${CI_PROJECT_DIR}/terraform
  TF_STATE_NAME: default

.terraform_template:
  image: hashicorp/terraform:1.6
  before_script:
    - cd ${TF_ROOT}
    - terraform init
      -backend-config="address=${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/terraform/state/${TF_STATE_NAME}"
      -backend-config="lock_address=${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/terraform/state/${TF_STATE_NAME}/lock"
      -backend-config="unlock_address=${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/terraform/state/${TF_STATE_NAME}/lock"
      -backend-config="username=gitlab-ci-token"
      -backend-config="password=${CI_JOB_TOKEN}"

tf-validate:
  extends: .terraform_template
  stage: validate
  script:
    - terraform validate
    - terraform fmt -check

tf-plan:
  extends: .terraform_template
  stage: plan
  script:
    - terraform plan -out=plan.tfplan
  artifacts:
    paths:
      - ${TF_ROOT}/plan.tfplan
    expire_in: 1 day

tf-apply:
  extends: .terraform_template
  stage: apply
  script:
    - terraform apply -auto-approve plan.tfplan
  dependencies:
    - tf-plan
  when: manual
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

## Caching Strategies

### Dependency Caching

```yaml
cache:
  # Per-branch cache
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/
  policy: pull-push

# Job-specific cache
build:
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules/
    policy: pull
```

### Docker Layer Caching

```yaml
build-docker:
  variables:
    DOCKER_BUILDKIT: 1
  script:
    - docker pull $CI_REGISTRY_IMAGE:latest || true
    - docker build
      --cache-from $CI_REGISTRY_IMAGE:latest
      --build-arg BUILDKIT_INLINE_CACHE=1
      -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

## Advanced Patterns

### Dynamic Child Pipelines

```yaml
# Parent pipeline
generate-config:
  stage: build
  script:
    - python generate_pipeline.py > child-pipeline.yml
  artifacts:
    paths:
      - child-pipeline.yml

trigger-child:
  stage: deploy
  trigger:
    include:
      - artifact: child-pipeline.yml
        job: generate-config
    strategy: depend
```

### Cross-Project Trigger

```yaml
trigger-deploy:
  stage: deploy
  trigger:
    project: infrastructure/deploy-pipeline
    branch: main
    strategy: depend
  variables:
    IMAGE_TAG: $CI_COMMIT_SHA
    SOURCE_PROJECT: $CI_PROJECT_PATH
```

### DAG (Directed Acyclic Graph)

```yaml
stages:
  - build
  - test
  - deploy

build-frontend:
  stage: build
  script: npm run build:frontend

build-backend:
  stage: build
  script: npm run build:backend

test-frontend:
  stage: test
  needs: [build-frontend]
  script: npm run test:frontend

test-backend:
  stage: test
  needs: [build-backend]
  script: npm run test:backend

deploy:
  stage: deploy
  needs: [test-frontend, test-backend]
  script: ./deploy.sh
```

## Rules & Conditions

```yaml
# Common rule patterns
.rules-default:
  rules:
    # MR pipelines
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    # Main branch
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
    # Tags
    - if: $CI_COMMIT_TAG

.rules-deploy:
  rules:
    # Only on main branch
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      when: manual
    # Auto-deploy tags
    - if: $CI_COMMIT_TAG =~ /^v\d+\.\d+\.\d+$/
      when: on_success

# File change rules
build-docs:
  rules:
    - changes:
        - docs/**/*
        - README.md
```

## Environment Variables & Secrets

```yaml
variables:
  # Global variables
  APP_NAME: myapp
  NODE_ENV: production

deploy:
  variables:
    # Job-specific
    DEPLOY_ENV: production
  script:
    # Use CI/CD variables (set in GitLab UI)
    - echo "Deploying with API_KEY=$API_KEY"
    # Use protected/masked variables for secrets
    - kubectl create secret generic app-secrets --from-literal=db-password=$DB_PASSWORD
```

## Best Practices Checklist

### Pipeline Configuration
- [ ] Use explicit image versions (not `latest`)
- [ ] Configure appropriate caching
- [ ] Set artifact expiration
- [ ] Use `needs` for DAG optimization
- [ ] Implement manual gates for production

### Security
- [ ] Enable SAST/DAST scanning
- [ ] Implement dependency scanning
- [ ] Use container scanning
- [ ] Store secrets in CI/CD variables (masked)
- [ ] Use protected branches/environments

### Performance
- [ ] Parallelize tests where possible
- [ ] Use Docker layer caching
- [ ] Cache dependencies effectively
- [ ] Use `interruptible: true` for non-critical jobs

### Monitoring
- [ ] Set up pipeline notifications
- [ ] Track deployment metrics
- [ ] Monitor job duration trends
- [ ] Alert on pipeline failures

## TRD Document Sections

When documenting CI/CD in TRD:

1. **Pipeline Overview**: Stages, flow diagram
2. **Build Process**: What gets built, how
3. **Test Strategy**: Unit, integration, E2E coverage
4. **Security Scanning**: Tools, thresholds
5. **Deployment Strategy**: Environments, promotion flow
6. **Rollback Procedures**: How to revert
7. **Environment Management**: Variables, secrets
8. **Runner Configuration**: Tags, requirements
9. **Caching Strategy**: What's cached, invalidation
10. **Notification Setup**: Who gets alerted, when
