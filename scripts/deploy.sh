#!/bin/bash

# =============================================================================
# Kubernetes Deployment Script
# =============================================================================
# Deploys application to different environments using Kustomize
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
KUBERNETES_DIR="$PROJECT_DIR/kubernetes"

# Default values
ENVIRONMENT="development"
NAMESPACE=""
DRY_RUN=false
ROLLBACK=false
VERSION=""

# Logging functions
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

# Help function
show_help() {
    cat << EOF
Usage: $0 [OPTIONS]

Deploy application to Kubernetes cluster using Kustomize.

OPTIONS:
    -e, --environment ENV    Environment to deploy to (development|staging|production)
    -n, --namespace NS       Override namespace
    -v, --version VERSION    Specific version to deploy
    -d, --dry-run           Perform dry run without applying changes
    -r, --rollback          Rollback to previous version
    -h, --help              Show this help message

EXAMPLES:
    $0 -e development
    $0 -e production -v v1.2.0
    $0 -e staging --dry-run
    $0 -e production --rollback

EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -n|--namespace)
            NAMESPACE="$2"
            shift 2
            ;;
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -r|--rollback)
            ROLLBACK=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

# Validate environment
validate_environment() {
    case $ENVIRONMENT in
        development|staging|production)
            ;;
        *)
            error "Invalid environment: $ENVIRONMENT. Must be development, staging, or production"
            ;;
    esac
}

# Set namespace based on environment
set_namespace() {
    if [[ -z "$NAMESPACE" ]]; then
        case $ENVIRONMENT in
            development)
                NAMESPACE="backend-dev"
                ;;
            staging)
                NAMESPACE="backend-staging"
                ;;
            production)
                NAMESPACE="production"
                ;;
        esac
    fi
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check kubectl
    if ! command -v kubectl &> /dev/null; then
        error "kubectl is not installed or not in PATH"
    fi
    
    # Check kustomize
    if ! command -v kustomize &> /dev/null; then
        error "kustomize is not installed or not in PATH"
    fi
    
    # Check cluster connectivity
    if ! kubectl cluster-info &> /dev/null; then
        error "Not connected to a Kubernetes cluster"
    fi
    
    log "Prerequisites check passed"
}

# Validate manifests
validate_manifests() {
    log "Validating Kubernetes manifests..."
    
    local overlay_path="$KUBERNETES_DIR/overlays/$ENVIRONMENT"
    
    if [[ ! -d "$overlay_path" ]]; then
        error "Overlay directory not found: $overlay_path"
    fi
    
    # Validate with kustomize
    if ! kustomize build "$overlay_path" | kubectl apply --dry-run=client -f -; then
        error "Manifest validation failed"
    fi
    
    log "Manifest validation passed"
}

# Deploy application
deploy_application() {
    log "Deploying to $ENVIRONMENT environment in namespace $NAMESPACE"
    
    local overlay_path="$KUBERNETES_DIR/overlays/$ENVIRONMENT"
    local dry_run_flag=""
    
    if [[ "$DRY_RUN" == true ]]; then
        dry_run_flag="--dry-run=client"
        log "Performing dry run..."
    fi
    
    # Apply namespace first
    kubectl apply -f "$KUBERNETES_DIR/ns/" $dry_run_flag
    
    # Apply RBAC
    kubectl apply -f "$KUBERNETES_DIR/rbac/" $dry_run_flag
    
    # Apply security policies
    kubectl apply -f "$KUBERNETES_DIR/security/" $dry_run_flag
    
    # Apply application using kustomize
    if [[ "$DRY_RUN" == true ]]; then
        kustomize build "$overlay_path" | kubectl apply --dry-run=client -f -
    else
        kustomize build "$overlay_path" | kubectl apply -f -
    fi
    
    log "Deployment completed successfully"
}

# Verify deployment
verify_deployment() {
    if [[ "$DRY_RUN" == true ]]; then
        log "Skipping verification for dry run"
        return
    fi
    
    log "Verifying deployment..."
    
    # Wait for deployment to be ready
    kubectl rollout status deployment/catstar -n "$NAMESPACE" --timeout=300s
    
    # Check pod status
    local pods_ready=$(kubectl get pods -n "$NAMESPACE" -l app=catstar --no-headers | grep -c "Running")
    local total_pods=$(kubectl get pods -n "$NAMESPACE" -l app=catstar --no-headers | wc -l)
    
    if [[ "$pods_ready" -eq "$total_pods" ]]; then
        log "All pods are running successfully"
    else
        warn "Not all pods are running. Ready: $pods_ready/$total_pods"
        kubectl get pods -n "$NAMESPACE" -l app=catstar
    fi
    
    # Check service endpoints
    kubectl get endpoints -n "$NAMESPACE" catstar-srvc
}

# Rollback deployment
rollback_deployment() {
    log "Rolling back deployment..."
    
    if ! kubectl rollout undo deployment/catstar -n "$NAMESPACE"; then
        error "Rollback failed"
    fi
    
    kubectl rollout status deployment/catstar -n "$NAMESPACE" --timeout=300s
    log "Rollback completed successfully"
}

# Main execution
main() {
    log "Starting deployment process..."
    
    validate_environment
    set_namespace
    check_prerequisites
    
    if [[ "$ROLLBACK" == true ]]; then
        rollback_deployment
    else
        validate_manifests
        deploy_application
        verify_deployment
    fi
    
    log "Deployment process completed"
}

# Run main function
main "$@" 