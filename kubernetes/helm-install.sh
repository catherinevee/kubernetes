#!/bin/bash
# =============================================================================
# KUBERNETES ADD-ONS INSTALLATION SCRIPT
# =============================================================================
# Helm installation for enterprise team
# Backend Team (7): Marcus, Riley, Priya, Jordan, Catherine (Lead), Karol, Ania
# Frontend Team (6): Zoe, Alex, Sam, Maya (Lead), Devon, Tomasz
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPANY_DOMAIN="${COMPANY_DOMAIN:-company.local}"
GRAFANA_PASSWORD="${GRAFANA_PASSWORD:-change-me-please}"
ARGOCD_PASSWORD="${ARGOCD_PASSWORD:-change-me-please}"

# =============================================================================
# HELM CHART VERSIONS - UPDATE THESE AS NEEDED
# =============================================================================

# Tier 1: Essential
CILIUM_VERSION="${CILIUM_VERSION:-1.14.5}"
INGRESS_NGINX_VERSION="${INGRESS_NGINX_VERSION:-4.8.3}"
CERT_MANAGER_VERSION="${CERT_MANAGER_VERSION:-v1.13.3}"

# Tier 2: Core Operations  
PROMETHEUS_STACK_VERSION="${PROMETHEUS_STACK_VERSION:-54.2.2}"
ARGOCD_VERSION="${ARGOCD_VERSION:-5.51.6}"
EXTERNAL_SECRETS_VERSION="${EXTERNAL_SECRETS_VERSION:-0.9.11}"

# Tier 3: Developer Productivity
METRICS_SERVER_VERSION="${METRICS_SERVER_VERSION:-3.11.0}"
SEALED_SECRETS_VERSION="${SEALED_SECRETS_VERSION:-2.13.3}"
VPA_VERSION="${VPA_VERSION:-4.4.6}"

# Tier 4: Security
FALCO_VERSION="${FALCO_VERSION:-3.8.4}"
GATEKEEPER_VERSION="${GATEKEEPER_VERSION:-3.14.0}"
TRIVY_OPERATOR_VERSION="${TRIVY_OPERATOR_VERSION:-0.17.1}"

# Tier 5: Observability
JAEGER_VERSION="${JAEGER_VERSION:-0.71.11}"
LOKI_STACK_VERSION="${LOKI_STACK_VERSION:-2.10.1}"
KEDA_VERSION="${KEDA_VERSION:-2.12.1}"

# Tier 6: Developer Experience
BACKSTAGE_VERSION="${BACKSTAGE_VERSION:-1.7.1}"
TEKTON_VERSION="${TEKTON_VERSION:-0.50.5}"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if kubectl is available
    if ! command -v kubectl &> /dev/null; then
        error "kubectl is not installed or not in PATH"
    fi
    
    # Check if helm is available
    if ! command -v helm &> /dev/null; then
        error "helm is not installed or not in PATH"
    fi
    
    # Check if connected to cluster
    if ! kubectl cluster-info &> /dev/null; then
        error "Not connected to a Kubernetes cluster"
    fi
    
    log "Prerequisites check passed"
}

# Add all Helm repositories
add_helm_repos() {
    log "Adding Helm repositories..."
    
    # Essential repos
    helm repo add cilium https://helm.cilium.io/
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo add jetstack https://charts.jetstack.io
    
    # Core operations repos
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add argo https://argoproj.github.io/argo-helm
    helm repo add external-secrets https://charts.external-secrets.io
    
    # Developer productivity repos
    helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
    helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
    helm repo add fairwinds-stable https://charts.fairwinds.com/stable
    
    # Security repos
    helm repo add falcosecurity https://falcosecurity.github.io/charts
    helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts
    helm repo add aqua https://aquasecurity.github.io/helm-charts/
    
    # Advanced observability repos
    helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
    helm repo add grafana https://grafana.github.io/helm-charts
    helm repo add kedacore https://kedacore.github.io/charts
    
    # Developer experience repos
    helm repo add backstage https://backstage.github.io/charts
    helm repo add cdf https://cdfoundation.github.io/tekton-helm-chart
    
    # Update all repositories
    helm repo update
    
    log "Helm repositories added and updated"
}

# =============================================================================
# TIER 1: ESSENTIAL (Deploy First Week)
# =============================================================================

install_tier1_essential() {
    # 1. Cilium CNI (Required for NetworkPolicies)
    log "Installing Cilium CNI..."
    helm upgrade --install cilium cilium/cilium \
        --namespace kube-system \
        --version "${CILIUM_VERSION}" \
        --set operator.replicas=1 \
        --set ipam.mode=kubernetes \
        --set kubeProxyReplacement=partial \
        --set hostServices.enabled=false \
        --set externalIPs.enabled=true \
        --set nodePort.enabled=true \
        --set hostPort.enabled=true \
        --set hubble.enabled=true \
        --set hubble.relay.enabled=true \
        --set hubble.ui.enabled=true \
        --set hubble.metrics.enabled="{dns,drop,tcp,flow,port-distribution,icmp,http}" \
        --wait --timeout=300s
    
    # 2. NGINX Ingress Controller
    log "Installing NGINX Ingress Controller..."
    kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -
    kubectl label namespace ingress-nginx name=ingress-nginx --overwrite
    
    helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx \
        --namespace ingress-nginx \
        --version "${INGRESS_NGINX_VERSION}" \
        --set controller.replicaCount=2 \
        --set controller.resources.requests.cpu=100m \
        --set controller.resources.requests.memory=90Mi \
        --set controller.resources.limits.cpu=500m \
        --set controller.resources.limits.memory=500Mi \
        --set controller.metrics.enabled=true \
        --set controller.metrics.serviceMonitor.enabled=true \
        --set controller.podAnnotations."prometheus\.io/scrape"="true" \
        --set controller.podAnnotations."prometheus\.io/port"="10254" \
        --set controller.service.type=LoadBalancer \
        --wait --timeout=300s
    
    # 3. Cert-Manager (SSL/TLS automation)
    log "Installing Cert-Manager..."
    kubectl create namespace cert-manager --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install cert-manager jetstack/cert-manager \
        --namespace cert-manager \
        --version "${CERT_MANAGER_VERSION}" \
        --set installCRDs=true \
        --set prometheus.enabled=true \
        --set webhook.resources.requests.cpu=10m \
        --set webhook.resources.requests.memory=32Mi \
        --set webhook.resources.limits.cpu=100m \
        --set webhook.resources.limits.memory=128Mi \
        --wait --timeout=300s
    
    log "Tier 1 installation completed successfully!"
}

# =============================================================================
# TIER 2: CORE OPERATIONS (Week 2-3)
# =============================================================================

install_tier2_core_operations() {
    # 1. Prometheus + Grafana Stack
    log "Installing Prometheus + Grafana Stack..."
    kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
    kubectl label namespace monitoring name=monitoring --overwrite
    
    helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
        --namespace monitoring \
        --version "${PROMETHEUS_STACK_VERSION}" \
        --set prometheus.prometheusSpec.retention=15d \
        --set prometheus.prometheusSpec.resources.requests.cpu=200m \
        --set prometheus.prometheusSpec.resources.requests.memory=2Gi \
        --set prometheus.prometheusSpec.resources.limits.cpu=1 \
        --set prometheus.prometheusSpec.resources.limits.memory=4Gi \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName=gp2 \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.accessModes[0]=ReadWriteOnce \
        --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=50Gi \
        --set grafana.adminPassword="${GRAFANA_PASSWORD}" \
        --set grafana.grafana\\.ini.security.admin_user=admin \
        --set grafana.grafana\\.ini.users.allow_sign_up=false \
        --set grafana.grafana\\.ini.auth\\.ldap.enabled=false \
        --set grafana.service.type=ClusterIP \
        --set grafana.ingress.enabled=true \
        --set grafana.ingress.ingressClassName=nginx \
        --set grafana.ingress.hosts[0]="grafana.${COMPANY_DOMAIN}" \
        --set alertmanager.alertmanagerSpec.resources.requests.cpu=10m \
        --set alertmanager.alertmanagerSpec.resources.requests.memory=32Mi \
        --set alertmanager.alertmanagerSpec.resources.limits.cpu=100m \
        --set alertmanager.alertmanagerSpec.resources.limits.memory=128Mi \
        --wait --timeout=600s
    
    # 2. ArgoCD (GitOps)
    log "Installing ArgoCD..."
    kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install argo-cd argo/argo-cd \
        --namespace argocd \
        --version "${ARGOCD_VERSION}" \
        --set global.logging.level=info \
        --set server.replicas=2 \
        --set server.ingress.enabled=true \
        --set server.ingress.ingressClassName=nginx \
        --set server.ingress.hosts[0]="argocd.${COMPANY_DOMAIN}" \
        --set server.ingress.tls[0].secretName=argocd-tls \
        --set server.ingress.tls[0].hosts[0]="argocd.${COMPANY_DOMAIN}" \
        --set server.service.type=ClusterIP \
        --set dex.enabled=false \
        --set server.config."accounts\.backend-team"="apiKey, login" \
        --set server.config."accounts\.frontend-team"="apiKey, login" \
        --set server.config."accounts\.catherine\.vee"="apiKey, login" \
        --set server.config."accounts\.maya\.singh"="apiKey, login" \
        --wait --timeout=600s
    
    # 3. External Secrets Operator
    log "Installing External Secrets Operator..."
    kubectl create namespace external-secrets-system --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install external-secrets external-secrets/external-secrets \
        --namespace external-secrets-system \
        --version "${EXTERNAL_SECRETS_VERSION}" \
        --set installCRDs=true \
        --set resources.requests.cpu=10m \
        --set resources.requests.memory=32Mi \
        --set resources.limits.cpu=100m \
        --set resources.limits.memory=128Mi \
        --wait --timeout=300s
    
    log "Tier 2 installation completed successfully!"
}

# =============================================================================
# TIER 3: DEVELOPER PRODUCTIVITY (Month 2)
# =============================================================================

install_tier3_developer_productivity() {
    # 1. Metrics Server
    log "Installing Metrics Server..."
    helm upgrade --install metrics-server metrics-server/metrics-server \
        --namespace kube-system \
        --version "${METRICS_SERVER_VERSION}" \
        --set replicas=1 \
        --set resources.requests.cpu=100m \
        --set resources.requests.memory=200Mi \
        --set resources.limits.cpu=500m \
        --set resources.limits.memory=1Gi \
        --set args[0]="--cert-dir=/tmp" \
        --set args[1]="--secure-port=4443" \
        --set args[2]="--kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname" \
        --set args[3]="--kubelet-use-node-status-port" \
        --set args[4]="--metric-resolution=15s" \
        --wait --timeout=300s
    
    # 2. Sealed Secrets
    log "Installing Sealed Secrets..."
    kubectl create namespace sealed-secrets-system --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install sealed-secrets sealed-secrets/sealed-secrets \
        --namespace sealed-secrets-system \
        --version "${SEALED_SECRETS_VERSION}" \
        --set resources.requests.cpu=50m \
        --set resources.requests.memory=64Mi \
        --set resources.limits.cpu=200m \
        --set resources.limits.memory=256Mi \
        --wait --timeout=300s
    
    # 3. Vertical Pod Autoscaler
    log "Installing Vertical Pod Autoscaler..."
    helm upgrade --install vpa fairwinds-stable/vpa \
        --namespace vpa-system \
        --create-namespace \
        --version "${VPA_VERSION}" \
        --set recommender.resources.requests.cpu=100m \
        --set recommender.resources.requests.memory=500Mi \
        --set recommender.resources.limits.cpu=1 \
        --set recommender.resources.limits.memory=1Gi \
        --set updater.resources.requests.cpu=100m \
        --set updater.resources.requests.memory=500Mi \
        --set updater.resources.limits.cpu=1 \
        --set updater.resources.limits.memory=1Gi \
        --wait --timeout=300s
    
    log "Tier 3 installation completed successfully!"
}

# =============================================================================
# TIER 4: ENHANCED SECURITY (Month 2-3)
# =============================================================================

install_tier4_enhanced_security() {
    # 1. Falco (Runtime Security)
    log "Installing Falco..."
    kubectl create namespace falco-system --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install falco falcosecurity/falco \
        --namespace falco-system \
        --version "${FALCO_VERSION}" \
        --set falco.grpc.enabled=true \
        --set falco.grpcOutput.enabled=true \
        --set falco.jsonOutput=true \
        --set falco.logLevel=info \
        --set falco.syscallEventDrops.actions[0]=log \
        --set falco.syscallEventDrops.actions[1]=alert \
        --set falco.syscallEventDrops.rate=0.1 \
        --set falco.syscallEventDrops.maxBurst=1000 \
        --set falcosidekick.enabled=true \
        --set falcosidekick.webui.enabled=true \
        --set falcosidekick.config.slack.webhookurl="" \
        --set falcosidekick.config.slack.channel="#security-alerts" \
        --set falcosidekick.config.slack.username="Falco" \
        --wait --timeout=300s
    
    # 2. OPA Gatekeeper
    log "Installing OPA Gatekeeper..."
    kubectl create namespace gatekeeper-system --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install gatekeeper gatekeeper/gatekeeper \
        --namespace gatekeeper-system \
        --version "${GATEKEEPER_VERSION}" \
        --set replicas=1 \
        --set controllerManager.resources.requests.cpu=100m \
        --set controllerManager.resources.requests.memory=256Mi \
        --set controllerManager.resources.limits.cpu=1000m \
        --set controllerManager.resources.limits.memory=512Mi \
        --set audit.resources.requests.cpu=100m \
        --set audit.resources.requests.memory=256Mi \
        --set audit.resources.limits.cpu=1000m \
        --set audit.resources.limits.memory=512Mi \
        --wait --timeout=300s
    
    # 3. Trivy Operator
    log "Installing Trivy Operator..."
    kubectl create namespace trivy-system --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install trivy-operator aqua/trivy-operator \
        --namespace trivy-system \
        --version "${TRIVY_OPERATOR_VERSION}" \
        --set serviceMonitor.enabled=true \
        --set trivy.resources.requests.cpu=100m \
        --set trivy.resources.requests.memory=100Mi \
        --set trivy.resources.limits.cpu=500m \
        --set trivy.resources.limits.memory=500Mi \
        --wait --timeout=300s
    
    log "Tier 4 installation completed successfully!"
}

# =============================================================================
# TIER 5: ADVANCED OBSERVABILITY (Month 3+)
# =============================================================================

install_tier5_advanced_observability() {
    # 1. Jaeger (Distributed Tracing)
    log "Installing Jaeger..."
    kubectl create namespace jaeger --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install jaeger jaegertracing/jaeger \
        --namespace jaeger \
        --version "${JAEGER_VERSION}" \
        --set provisionDataStore.cassandra=false \
        --set provisionDataStore.elasticsearch=true \
        --set storage.type=elasticsearch \
        --set elasticsearch.replicas=1 \
        --set elasticsearch.resources.requests.cpu=200m \
        --set elasticsearch.resources.requests.memory=1Gi \
        --set elasticsearch.resources.limits.cpu=500m \
        --set elasticsearch.resources.limits.memory=2Gi \
        --set elasticsearch.volumeClaimTemplate.spec.storageClassName=gp2 \
        --set elasticsearch.volumeClaimTemplate.spec.resources.requests.storage=10Gi \
        --wait --timeout=600s
    
    # 2. Loki + Promtail (Log Aggregation)
    log "Installing Loki Stack..."
    helm upgrade --install loki grafana/loki-stack \
        --namespace monitoring \
        --version "${LOKI_STACK_VERSION}" \
        --set loki.enabled=true \
        --set promtail.enabled=true \
        --set fluent-bit.enabled=false \
        --set logstash.enabled=false \
        --set loki.persistence.enabled=true \
        --set loki.persistence.storageClassName=gp2 \
        --set loki.persistence.size=10Gi \
        --set loki.resources.requests.cpu=100m \
        --set loki.resources.requests.memory=128Mi \
        --set loki.resources.limits.cpu=500m \
        --set loki.resources.limits.memory=512Mi \
        --wait --timeout=300s
    
    # 3. KEDA (Advanced Autoscaling)
    log "Installing KEDA..."
    kubectl create namespace keda --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install keda kedacore/keda \
        --namespace keda \
        --version "${KEDA_VERSION}" \
        --set resources.operator.requests.cpu=100m \
        --set resources.operator.requests.memory=64Mi \
        --set resources.operator.limits.cpu=1 \
        --set resources.operator.limits.memory=1Gi \
        --set resources.metricServer.requests.cpu=100m \
        --set resources.metricServer.requests.memory=64Mi \
        --set resources.metricServer.limits.cpu=1 \
        --set resources.metricServer.limits.memory=1Gi \
        --set prometheus.metricServer.enabled=true \
        --set prometheus.operator.enabled=true \
        --wait --timeout=300s
    
    log "Tier 5 installation completed successfully!"
}

# =============================================================================
# TIER 6: DEVELOPER EXPERIENCE (Month 4+)
# =============================================================================

install_tier6_developer_experience() {
    # 1. Backstage (Developer Portal)
    log "Installing Backstage..."
    kubectl create namespace backstage --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install backstage backstage/backstage \
        --namespace backstage \
        --version "${BACKSTAGE_VERSION}" \
        --set backstage.image.repository=backstage \
        --set backstage.image.tag=latest \
        --set backstage.resources.requests.cpu=100m \
        --set backstage.resources.requests.memory=256Mi \
        --set backstage.resources.limits.cpu=500m \
        --set backstage.resources.limits.memory=1Gi \
        --set ingress.enabled=true \
        --set ingress.className=nginx \
        --set ingress.host="backstage.${COMPANY_DOMAIN}" \
        --wait --timeout=300s
    
    # 2. Tekton (Cloud-native CI/CD)
    log "Installing Tekton..."
    kubectl create namespace tekton-pipelines --dry-run=client -o yaml | kubectl apply -f -
    
    helm upgrade --install tekton-pipeline cdf/tekton-pipeline \
        --namespace tekton-pipelines \
        --version "${TEKTON_VERSION}" \
        --set controller.resources.requests.cpu=100m \
        --set controller.resources.requests.memory=100Mi \
        --set controller.resources.limits.cpu=1000m \
        --set controller.resources.limits.memory=1000Mi \
        --set webhook.resources.requests.cpu=100m \
        --set webhook.resources.requests.memory=100Mi \
        --set webhook.resources.limits.cpu=500m \
        --set webhook.resources.limits.memory=500Mi \
        --wait --timeout=300s
    
    log "Tier 6 installation completed successfully!"
}

# =============================================================================
# POST-INSTALLATION CONFIGURATION
# =============================================================================

configure_team_access() {
    log "Configuring team-specific access..."
    
    # Create team namespaces if they don't exist
    kubectl create namespace backend-dev --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace frontend-dev --dry-run=client -o yaml | kubectl apply -f -
    kubectl create namespace platform-services --dry-run=client -o yaml | kubectl apply -f -
    
    # Label namespaces
    kubectl label namespace backend-dev team=backend environment=development --overwrite
    kubectl label namespace frontend-dev team=frontend environment=development --overwrite
    kubectl label namespace platform-services team=platform environment=shared --overwrite
    
    # Create basic team ConfigMaps
    cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: team-roster
  namespace: backend-dev
data:
  team-lead: "catherine.vee"
  senior-developers: "jordan.kim"
  developers: "riley.thompson,priya.patel,karol.nowak"
  junior-developers: "marcus.chen,ania.kowalski"
  team-size: "7"
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: team-roster
  namespace: frontend-dev
data:
  team-lead: "maya.singh"
  senior-developers: "devon.clark"
  developers: "alex.rodriguez,sam.johnson,tomasz.wisniewski"
  junior-developers: "zoe.martinez"
  team-size: "6"
EOF
    
    log "Team access configured"
}

print_access_info() {
    log "=== ACCESS INFORMATION ==="
    echo ""
    echo "🎯 Web Interfaces:"
    echo "  Grafana:    https://grafana.${COMPANY_DOMAIN}"
    echo "  ArgoCD:     https://argocd.${COMPANY_DOMAIN}"
    echo "  Backstage:  https://backstage.${COMPANY_DOMAIN}"
    echo ""
    echo "🔑 Default Credentials:"
    echo "  Grafana:    admin / ${GRAFANA_PASSWORD}"
    echo "  ArgoCD:     admin / (get with: kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d)"
    echo ""
    echo "👥 Team Access:"
    echo "  Backend Team Lead:  catherine.vee (7 developers)"
    echo "  Frontend Team Lead: maya.singh (6 developers)"
    echo ""
    echo "🔧 Useful Commands:"
    echo "  Check add-on status: kubectl get pods --all-namespaces | grep -E '(cilium|nginx|cert-manager|prometheus|grafana|argocd)'"
    echo "  Port-forward Grafana: kubectl port-forward -n monitoring svc/kube-prometheus-stack-grafana 3000:80"
    echo "  Port-forward ArgoCD: kubectl port-forward -n argocd svc/argo-cd-argocd-server 8080:443"
    echo ""
}

# =============================================================================
# MAIN INSTALLATION FLOW
# =============================================================================

main() {
    log "Starting Kubernetes Add-ons Installation for 10-Developer Team"
    log "Backend Team: Catherine Vee (Lead), Jordan Kim, Riley Thompson, Priya Patel, Karol Nowak, Marcus Chen, Ania Kowalski"
    log "Frontend Team: Maya Singh (Lead), Devon Clark, Alex Rodriguez, Sam Johnson, Tomasz Wiśniewski, Zoe Martinez"
    echo ""
    
    # Parse command line arguments
    TIER="all"
    if [[ $# -gt 0 ]]; then
        TIER=$1
    fi
    
    check_prerequisites
    add_helm_repos
    
    case $TIER in
        "1"|"tier1"|"essential")
            install_tier1_essential
            ;;
        "2"|"tier2"|"core")
            install_tier1_essential
            install_tier2_core_operations
            ;;
        "3"|"tier3"|"productivity")
            install_tier1_essential
            install_tier2_core_operations
            install_tier3_developer_productivity
            ;;
        "4"|"tier4"|"security")
            install_tier1_essential
            install_tier2_core_operations
            install_tier3_developer_productivity
            install_tier4_enhanced_security
            ;;
        "5"|"tier5"|"observability")
            install_tier1_essential
            install_tier2_core_operations
            install_tier3_developer_productivity
            install_tier4_enhanced_security
            install_tier5_advanced_observability
            ;;
        "all"|"6"|"tier6"|"full")
            install_tier1_essential
            install_tier2_core_operations
            install_tier3_developer_productivity
            install_tier4_enhanced_security
            install_tier5_advanced_observability
            install_tier6_developer_experience
            ;;
        *)
            error "Invalid tier specified. Use: 1, 2, 3, 4, 5, or all"
            ;;
    esac
    
    configure_team_access
    print_access_info
    
    log "🎉 Installation completed successfully!"
    log "Your 10-developer team now has a fully configured Kubernetes platform!"
}

# Show usage if --help is passed
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    echo "Usage: $0 [tier]"
    echo ""
    echo "Tiers:"
    echo "  1, tier1, essential    - Essential add-ons (Cilium, NGINX, Cert-Manager)"
    echo "  2, tier2, core         - Core operations (+ Prometheus, ArgoCD, External Secrets)"
    echo "  3, tier3, productivity - Developer productivity (+ Metrics Server, Sealed Secrets, VPA)"
    echo "  4, tier4, security     - Enhanced security (+ Falco, Gatekeeper, Trivy)"
    echo "  5, tier5, observability- Advanced observability (+ Jaeger, Loki, KEDA)"
    echo "  all, 6, tier6, full    - Full installation (+ Backstage, Tekton)"
    echo ""
    echo "Environment Variables:"
    echo "  COMPANY_DOMAIN         - Your company domain (default: company.local)"
    echo "  GRAFANA_PASSWORD       - Grafana admin password (default: change-me-please)"
    echo "  ARGOCD_PASSWORD        - ArgoCD admin password (default: change-me-please)"
    echo ""
    echo "Version Variables (Tier 1):"
    echo "  CILIUM_VERSION         - Cilium CNI version (default: ${CILIUM_VERSION})"
    echo "  INGRESS_NGINX_VERSION  - NGINX Ingress version (default: ${INGRESS_NGINX_VERSION})"
    echo "  CERT_MANAGER_VERSION   - Cert-Manager version (default: ${CERT_MANAGER_VERSION})"
    echo ""
    echo "Version Variables (Tier 2):"
    echo "  PROMETHEUS_STACK_VERSION - Prometheus stack version (default: ${PROMETHEUS_STACK_VERSION})"
    echo "  ARGOCD_VERSION          - ArgoCD version (default: ${ARGOCD_VERSION})"
    echo "  EXTERNAL_SECRETS_VERSION - External Secrets version (default: ${EXTERNAL_SECRETS_VERSION})"
    echo ""
    echo "Examples:"
    echo "  $0 1                   # Install only essential add-ons"
    echo "  $0 core                # Install essential + core operations"
    echo "  $0 all                 # Install everything"
    echo "  COMPANY_DOMAIN=mycompany.com $0 2"
    echo "  CILIUM_VERSION=1.15.0 INGRESS_NGINX_VERSION=4.9.0 $0 1"
    exit 0
fi

# Run main function
main "$@"