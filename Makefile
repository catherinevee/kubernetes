# =============================================================================
# Kubernetes Infrastructure Makefile
# =============================================================================
# Common operations for managing Kubernetes infrastructure
# =============================================================================

.PHONY: help install deploy-dev deploy-staging deploy-prod validate test clean

# Default target
help:
	@echo "Available targets:"
	@echo "  install        - Install all Kubernetes infrastructure"
	@echo "  deploy-dev     - Deploy to development environment"
	@echo "  deploy-staging - Deploy to staging environment"
	@echo "  deploy-prod    - Deploy to production environment"
	@echo "  validate       - Validate all manifests"
	@echo "  test           - Run tests"
	@echo "  clean          - Clean up resources"
	@echo "  build          - Build Docker images"
	@echo "  push           - Push Docker images"
	@echo "  logs           - Show application logs"
	@echo "  status         - Show deployment status"

# Variables
KUBERNETES_DIR := kubernetes
DOCKER_DIR := docker
SCRIPTS_DIR := scripts

# Install all infrastructure
install:
	@echo "Installing Kubernetes infrastructure..."
	cd $(KUBERNETES_DIR) && ./helm-install.sh
	@echo "Infrastructure installation completed"

# Deploy to development
deploy-dev:
	@echo "Deploying to development environment..."
	./$(SCRIPTS_DIR)/deploy.sh -e development
	@echo "Development deployment completed"

# Deploy to staging
deploy-staging:
	@echo "Deploying to staging environment..."
	./$(SCRIPTS_DIR)/deploy.sh -e staging
	@echo "Staging deployment completed"

# Deploy to production
deploy-prod:
	@echo "Deploying to production environment..."
	./$(SCRIPTS_DIR)/deploy.sh -e production
	@echo "Production deployment completed"

# Validate manifests
validate:
	@echo "Validating Kubernetes manifests..."
	kubectl apply --dry-run=client -f $(KUBERNETES_DIR)/ns/
	kubectl apply --dry-run=client -f $(KUBERNETES_DIR)/rbac/
	kubectl apply --dry-run=client -f $(KUBERNETES_DIR)/security/
	kubectl apply --dry-run=client -f $(KUBERNETES_DIR)/deployment.yml
	kubectl apply --dry-run=client -f $(KUBERNETES_DIR)/service.yml
	kubectl apply --dry-run=client -f $(KUBERNETES_DIR)/ingress.yml
	kubectl apply --dry-run=client -f $(KUBERNETES_DIR)/ssl.yml
	@echo "Manifest validation completed"

# Run tests
test:
	@echo "Running tests..."
	kubectl apply -f $(KUBERNETES_DIR)/testing/
	@echo "Tests completed"

# Clean up resources
clean:
	@echo "Cleaning up resources..."
	kubectl delete -f $(KUBERNETES_DIR)/ssl.yml --ignore-not-found=true
	kubectl delete -f $(KUBERNETES_DIR)/ingress.yml --ignore-not-found=true
	kubectl delete -f $(KUBERNETES_DIR)/service.yml --ignore-not-found=true
	kubectl delete -f $(KUBERNETES_DIR)/deployment.yml --ignore-not-found=true
	kubectl delete -f $(KUBERNETES_DIR)/security/ --ignore-not-found=true
	kubectl delete -f $(KUBERNETES_DIR)/rbac/ --ignore-not-found=true
	kubectl delete -f $(KUBERNETES_DIR)/ns/ --ignore-not-found=true
	@echo "Cleanup completed"

# Build Docker images
build:
	@echo "Building Docker images..."
	docker build -t catherinevee/catherineitcom:latest $(DOCKER_DIR)
	docker build -t catherinevee/catcode:latest $(DOCKER_DIR)
	@echo "Docker build completed"

# Push Docker images
push:
	@echo "Pushing Docker images..."
	docker push catherinevee/catherineitcom:latest
	docker push catherinevee/catcode:latest
	@echo "Docker push completed"

# Show application logs
logs:
	@echo "Showing application logs..."
	kubectl logs -f deployment/catstar -n default

# Show deployment status
status:
	@echo "Deployment status:"
	kubectl get pods -A
	kubectl get services -A
	kubectl get ingress -A

# Security scan
security-scan:
	@echo "Running security scan..."
	trivy fs $(KUBERNETES_DIR)
	trivy image catherinevee/catherineitcom:latest
	trivy image catherinevee/catcode:latest

# Backup configuration
backup:
	@echo "Creating backup..."
	tar -czf kubernetes-backup-$(shell date +%Y%m%d-%H%M%S).tar.gz $(KUBERNETES_DIR)
	@echo "Backup completed"

# Restore configuration
restore:
	@echo "Restoring from backup..."
	@read -p "Enter backup file name: " backup_file; \
	tar -xzf $$backup_file
	@echo "Restore completed" 