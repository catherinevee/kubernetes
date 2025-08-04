# Kubernetes Infrastructure

This directory contains the complete Kubernetes infrastructure for the enterprise application deployment.

## 🏗️ Architecture Overview

The infrastructure is designed for a 13-developer enterprise team with the following structure:
- **Backend Team (7)**: Marcus, Riley, Priya, Jordan, Catherine (Lead), Karol, Ania
- **Frontend Team (6)**: Zoe, Alex, Sam, Maya (Lead), Devon, Tomasz

### Application Components
- **catstar**: Main application container (port 31916)
- **catcode**: Secondary application container (port 31915)
- **Frontend**: React-based UI application

## 📁 Directory Structure

```
kubernetes/
├── kubernetes/                 # Kubernetes manifests
│   ├── deployment.yml         # Application deployment
│   ├── service.yml           # LoadBalancer service
│   ├── ingress.yml           # Ingress configuration
│   ├── ssl.yml              # SSL/TLS configuration
│   ├── ns/                   # Namespace definitions
│   ├── rbac/                 # Role-based access control
│   ├── security/             # Network policies
│   └── testing/              # Testing resources
├── docker/                   # Container configuration
│   ├── Dockerfile           # Multi-stage build
│   └── frontend/            # React application
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Kubernetes cluster (1.24+)
- kubectl configured
- Helm 3.x
- Docker

### Installation

1. **Deploy the infrastructure:**
   ```bash
   cd kubernetes/kubernetes
   ./helm-install.sh
   ```

2. **Apply application manifests:**
   ```bash
   kubectl apply -f ns/
   kubectl apply -f rbac/
   kubectl apply -f security/
   kubectl apply -f deployment.yml
   kubectl apply -f service.yml
   kubectl apply -f ingress.yml
   kubectl apply -f ssl.yml
   ```

3. **Build and deploy the frontend:**
   ```bash
   cd ../docker
   docker build -t catherinevee/catherineitcom:latest .
   docker push catherinevee/catherineitcom:latest
   ```

## 🔒 Security Features

- **Network Policies**: Multi-layered network security
- **RBAC**: Role-based access control for teams
- **SSL/TLS**: Automatic certificate management
- **Pod Security**: Resource limits and security contexts

## 📊 Monitoring & Observability

The infrastructure includes:
- Prometheus & Grafana for metrics
- Loki for log aggregation
- Jaeger for distributed tracing
- Falco for runtime security monitoring

## 🧪 Testing

Network policy testing resources are available in `kubernetes/testing/`.

## 🔧 Configuration

### Environment Variables
- `COMPANY_DOMAIN`: Your company domain
- `GRAFANA_PASSWORD`: Grafana admin password
- `ARGOCD_PASSWORD`: ArgoCD admin password

### Customization
- Update namespace labels and annotations in `ns/namespace.yml`
- Modify RBAC roles in `rbac/` directory
- Adjust network policies in `security/` directory

## 📝 Contributing

1. Follow the existing naming conventions
2. Update documentation for any changes
3. Test network policies before deployment
4. Ensure RBAC follows least-privilege principle

## 🆘 Troubleshooting

### Common Issues
- **Certificate issues**: Check cert-manager installation
- **Network connectivity**: Verify network policies
- **RBAC errors**: Ensure proper role assignments

### Debug Commands
```bash
# Check pod status
kubectl get pods -A

# View logs
kubectl logs -f deployment/catstar

# Test network policies
kubectl apply -f testing/networkpolicy-network-tshoot.yml
```

## 📞 Support

For issues or questions:
- **Backend Team**: catherine.vee@cstarrez.wcu
- **Frontend Team**: maya.singh@cstarrez.wcu
- **DevOps**: devops@cstarrez.wcu
