---
name: grafana-dashboards
description: Create and manage production Grafana dashboards for real-time visualization of system and application metrics. Use when building monitoring dashboards, visualizing metrics, or setting up operational observability interfaces.
---

# Grafana Dashboard Patterns

This skill provides comprehensive guidance for creating production-ready Grafana dashboards for monitoring systems, applications, and business metrics.

## Core Monitoring Methodologies

### RED Method (For Services)
- **R**ate: Requests per second
- **E**rrors: Error rate percentage
- **D**uration: Latency/response time

```promql
# Rate
rate(http_requests_total[5m])

# Errors
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) * 100

# Duration (95th percentile)
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

### USE Method (For Resources)
- **U**tilization: Percentage of resource busy
- **S**aturation: Queue length, waiting work
- **E**rrors: Error counts

```promql
# CPU Utilization
100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory Saturation
node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes

# Disk Errors
rate(node_disk_io_time_weighted_seconds_total[5m])
```

## Dashboard Types

### 1. API Monitoring Dashboard

**Key Panels**:

| Panel | Metric | Visualization |
|-------|--------|---------------|
| Request Rate | `rate(http_requests_total[5m])` | Time series |
| Error Rate | `rate(http_requests_total{status=~"5.."}[5m])` | Stat + threshold |
| P50/P95/P99 Latency | `histogram_quantile()` | Time series |
| Status Code Distribution | `sum by (status)` | Pie chart |
| Top Endpoints | `topk(10, rate(...))` | Table |

**Dashboard JSON Structure**:
```json
{
  "dashboard": {
    "title": "API Monitoring",
    "tags": ["api", "production"],
    "timezone": "browser",
    "refresh": "30s",
    "panels": [
      {
        "title": "Request Rate",
        "type": "timeseries",
        "gridPos": {"h": 8, "w": 12, "x": 0, "y": 0},
        "targets": [
          {
            "expr": "sum(rate(http_requests_total[5m]))",
            "legendFormat": "Total RPS"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "reqps",
            "custom": {
              "lineWidth": 2,
              "fillOpacity": 10
            }
          }
        }
      },
      {
        "title": "Error Rate",
        "type": "stat",
        "gridPos": {"h": 4, "w": 6, "x": 12, "y": 0},
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "percent",
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {"color": "green", "value": null},
                {"color": "yellow", "value": 1},
                {"color": "red", "value": 5}
              ]
            }
          }
        }
      }
    ]
  }
}
```

### 2. Infrastructure Dashboard

**CPU Panel**:
```promql
# CPU Usage by Core
100 - (avg by (cpu) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# System vs User CPU
avg(irate(node_cpu_seconds_total{mode="system"}[5m])) * 100
avg(irate(node_cpu_seconds_total{mode="user"}[5m])) * 100
```

**Memory Panel**:
```promql
# Memory Usage Percentage
(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100

# Memory Breakdown
node_memory_MemTotal_bytes
node_memory_MemFree_bytes
node_memory_Cached_bytes
node_memory_Buffers_bytes
```

**Disk I/O Panel**:
```promql
# Read/Write IOPS
rate(node_disk_reads_completed_total[5m])
rate(node_disk_writes_completed_total[5m])

# Disk Throughput
rate(node_disk_read_bytes_total[5m])
rate(node_disk_written_bytes_total[5m])
```

**Network Panel**:
```promql
# Network Traffic
rate(node_network_receive_bytes_total{device!="lo"}[5m])
rate(node_network_transmit_bytes_total{device!="lo"}[5m])

# Packet Errors
rate(node_network_receive_errs_total[5m])
rate(node_network_transmit_errs_total[5m])
```

### 3. Database Dashboard

**PostgreSQL Metrics**:
```promql
# Active Connections
pg_stat_activity_count{state="active"}

# Connection Pool Usage
pg_stat_activity_count / pg_settings_max_connections * 100

# Query Duration (P95)
histogram_quantile(0.95, rate(pg_stat_statements_seconds_bucket[5m]))

# Cache Hit Ratio
pg_stat_database_blks_hit / (pg_stat_database_blks_hit + pg_stat_database_blks_read) * 100

# Replication Lag
pg_replication_lag_seconds
```

**MongoDB Metrics**:
```promql
# Operations per Second
rate(mongodb_op_counters_total[5m])

# Document Operations
rate(mongodb_mongod_metrics_document_total[5m])

# Connection Count
mongodb_connections{state="current"}
```

### 4. Application Dashboard

**Business Metrics**:
```promql
# Active Users
sum(active_users_total)

# Orders per Minute
rate(orders_total[1m]) * 60

# Revenue (if tracked)
sum(increase(revenue_total[1h]))

# Feature Usage
sum by (feature) (rate(feature_usage_total[5m]))
```

**Queue Metrics**:
```promql
# Queue Depth
rabbitmq_queue_messages

# Processing Rate
rate(messages_processed_total[5m])

# Consumer Lag (Kafka)
kafka_consumergroup_lag
```

## Panel Types & Usage

### Stat Panel
Best for: Single important values, KPIs
```json
{
  "type": "stat",
  "options": {
    "reduceOptions": {
      "calcs": ["lastNotNull"],
      "fields": ""
    },
    "colorMode": "background",
    "graphMode": "area"
  }
}
```

### Time Series Panel
Best for: Trends over time
```json
{
  "type": "timeseries",
  "options": {
    "legend": {
      "displayMode": "table",
      "placement": "bottom",
      "calcs": ["mean", "max", "last"]
    }
  },
  "fieldConfig": {
    "defaults": {
      "custom": {
        "lineInterpolation": "smooth",
        "fillOpacity": 10,
        "showPoints": "never"
      }
    }
  }
}
```

### Heatmap Panel
Best for: Distribution over time
```json
{
  "type": "heatmap",
  "options": {
    "calculate": false,
    "yAxis": {
      "axisPlacement": "left",
      "unit": "s"
    },
    "cellGap": 1,
    "color": {
      "scheme": "Spectral"
    }
  }
}
```

### Table Panel
Best for: Detailed breakdowns, top-N lists
```json
{
  "type": "table",
  "options": {
    "sortBy": [{"displayName": "Value", "desc": true}]
  },
  "transformations": [
    {
      "id": "sortBy",
      "options": {
        "sort": [{"field": "Value", "desc": true}]
      }
    }
  ]
}
```

## Dashboard Variables (Templating)

```json
{
  "templating": {
    "list": [
      {
        "name": "environment",
        "type": "query",
        "query": "label_values(up, environment)",
        "current": {"text": "production", "value": "production"},
        "includeAll": true,
        "multi": true
      },
      {
        "name": "service",
        "type": "query",
        "query": "label_values(up{environment=\"$environment\"}, service)",
        "refresh": 2,
        "sort": 1
      },
      {
        "name": "interval",
        "type": "interval",
        "options": [
          {"text": "1m", "value": "1m"},
          {"text": "5m", "value": "5m"},
          {"text": "15m", "value": "15m"},
          {"text": "1h", "value": "1h"}
        ],
        "current": {"text": "5m", "value": "5m"}
      }
    ]
  }
}
```

## Alerting Configuration

```json
{
  "alert": {
    "name": "High Error Rate",
    "conditions": [
      {
        "evaluator": {
          "type": "gt",
          "params": [5]
        },
        "operator": {
          "type": "and"
        },
        "query": {
          "params": ["A", "5m", "now"]
        },
        "reducer": {
          "type": "avg"
        },
        "type": "query"
      }
    ],
    "executionErrorState": "alerting",
    "for": "5m",
    "frequency": "1m",
    "noDataState": "no_data",
    "notifications": [
      {"uid": "slack-channel"}
    ]
  }
}
```

## Provisioning (Infrastructure as Code)

### YAML Provisioning

```yaml
# /etc/grafana/provisioning/dashboards/default.yaml
apiVersion: 1
providers:
  - name: 'default'
    orgId: 1
    folder: 'Production'
    type: file
    disableDeletion: false
    updateIntervalSeconds: 30
    options:
      path: /var/lib/grafana/dashboards
```

### Terraform

```hcl
resource "grafana_dashboard" "api_monitoring" {
  config_json = file("dashboards/api-monitoring.json")
  folder      = grafana_folder.production.id
  overwrite   = true
}

resource "grafana_folder" "production" {
  title = "Production"
}

resource "grafana_data_source" "prometheus" {
  type       = "prometheus"
  name       = "Prometheus"
  url        = "http://prometheus:9090"
  is_default = true
}
```

### Ansible

```yaml
- name: Deploy Grafana dashboards
  grafana_dashboard:
    grafana_url: "{{ grafana_url }}"
    grafana_api_key: "{{ grafana_api_key }}"
    state: present
    commit_message: "Deployed via Ansible"
    overwrite: yes
    path: "{{ item }}"
  with_fileglob:
    - "dashboards/*.json"
```

## Best Practices

### Dashboard Organization
- **Row grouping**: Group related panels in collapsible rows
- **Consistent layout**: 24-column grid, standard panel sizes
- **Color coding**: Red for errors, yellow for warnings, green for healthy
- **Time range**: Default to useful range (1h, 6h, 24h)

### Naming Conventions
```
Dashboard: [Environment] - [Service] - [Type]
Example: Production - API Gateway - Performance

Panel: [Metric Type] - [Specific Metric]
Example: Latency - P95 Response Time
```

### Performance Tips
- Use `$__interval` for automatic interval adjustment
- Limit query time ranges in panels
- Use recording rules for expensive queries
- Set appropriate refresh intervals (not too aggressive)

### Threshold Guidelines

| Metric | Warning | Critical |
|--------|---------|----------|
| Error Rate | > 1% | > 5% |
| P95 Latency | > 500ms | > 2s |
| CPU Usage | > 70% | > 90% |
| Memory Usage | > 80% | > 95% |
| Disk Usage | > 70% | > 85% |

## TRD/Architecture Document Sections

When documenting monitoring in TRD:

1. **Dashboard Inventory**: List of dashboards, purposes
2. **Key Metrics**: Which metrics, why they matter
3. **Alerting Rules**: Thresholds, escalation paths
4. **Data Sources**: Prometheus, CloudWatch, etc.
5. **Retention Policy**: How long to keep metrics
6. **Access Control**: Who can view/edit dashboards
7. **SLA Dashboards**: Customer-facing metrics
8. **On-Call Runbooks**: Link dashboards to runbooks
