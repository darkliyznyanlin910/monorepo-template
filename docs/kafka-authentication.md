# Kafka Authentication Implementation

## Overview

Basic SASL/SCRAM-SHA-512 authentication has been implemented between Kafka and Kafka UI services.

## Configuration Summary

### Kafka (Bitnami Helm Chart)

- **Authentication Protocol**: SASL/SCRAM-SHA-512
- **Listeners**:
  - Client: SASL_PLAINTEXT on port 9092
  - Controller: PLAINTEXT on port 9093
  - Interbroker: SASL_PLAINTEXT on port 9094
- **Authorization**: ACL-based with superuser
- **Superuser**: `admin`

### Kafka UI (Kafbat Helm Chart)

- **Kafka Connection**: SASL_PLAINTEXT with SCRAM-SHA-512
- **UI Authentication**: LOGIN_FORM enabled

## Credentials

### Kafka Users

| User              | Password          | Role                       |
| ----------------- | ----------------- | -------------------------- |
| admin             | adminpass         | Superuser                  |
| kafkauser         | kafkapass         | Regular user               |
| inter-broker-user | inter-broker-pass | Inter-broker communication |

### Kafka UI Access

- **Username**: admin
- **Password**: uipass

## Testing Steps

1. **Deploy Kafka**:

   ```bash
   kubectl apply -k argocd/infra/kafka/envs/dev/
   ```

2. **Deploy Kafka UI**:

   ```bash
   kubectl apply -k argocd/infra/kafka-ui/envs/dev/
   ```

3. **Verify Kafka Authentication**:

   ```bash
   # Test connection with correct credentials
   kubectl exec -it kafka-0 -n kafka -- kafka-console-producer.sh \
     --bootstrap-server localhost:9092 \
     --topic test \
     --producer.config /opt/bitnami/kafka/config/producer.properties
   ```

4. **Access Kafka UI**:
   - Navigate to: https://kafka-ui.127.0.0.1.nip.io
   - Login with: admin / uipass
   - Verify connection to Kafka cluster

## Security Features Implemented

1. **SASL/SCRAM-SHA-512**: Strong password-based authentication
2. **ACL Authorization**: Role-based access control
3. **Superuser Configuration**: Admin user with full privileges
4. **UI Authentication**: Web interface login protection
5. **No ACL Fallback Disabled**: Ensures secure-by-default behavior

## Notes

- ACLs must be configured for non-superuser access
- All passwords are in plaintext for development - use secrets in production
- Inter-broker communication is also authenticated
- Controller listener remains plaintext as required for KRaft mode
