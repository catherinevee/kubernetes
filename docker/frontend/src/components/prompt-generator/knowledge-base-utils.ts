
export const generateKnowledgeBasePrompts = (): string => {
  const itProjects = [
    {
      description: "cloud-native microservices platform",
      techStack: "Kubernetes, Docker, Terraform, Python, AWS EKS",
      features: "auto-scaling, service mesh, monitoring, CI/CD pipelines",
      constraints: "high availability, security compliance, cost optimization",
      preferences: "Infrastructure as Code, GitOps workflows, containerized deployments"
    },
    {
      description: "multi-cloud infrastructure automation system",
      techStack: "Terraform, Ansible, Python, AWS, Azure, GCP",
      features: "cross-cloud deployment, resource management, cost tracking",
      constraints: "vendor-agnostic design, disaster recovery, compliance",
      preferences: "modular Terraform modules, Python automation scripts"
    },
    {
      description: "DevOps CI/CD pipeline orchestration",
      techStack: "Jenkins, GitLab CI, Docker, Kubernetes, Python",
      features: "automated testing, deployment strategies, rollback mechanisms",
      constraints: "zero-downtime deployments, security scanning, audit trails",
      preferences: "pipeline as code, automated quality gates"
    },
    {
      description: "network security monitoring platform",
      techStack: "Palo Alto firewalls, Cisco routers, Python, Linux, ELK Stack",
      features: "threat detection, traffic analysis, automated responses",
      constraints: "real-time processing, regulatory compliance, scalability",
      preferences: "network automation, security orchestration"
    },
    {
      description: "Linux system administration dashboard",
      techStack: "Python, Bash, Linux, Docker, Prometheus, Grafana",
      features: "system monitoring, log aggregation, performance metrics",
      constraints: "minimal resource usage, high reliability, security hardening",
      preferences: "shell scripting best practices, configuration management"
    },
    {
      description: "AWS cloud migration assessment tool",
      techStack: "AWS CLI, Python, Terraform, CloudFormation, Lambda",
      features: "cost analysis, dependency mapping, migration planning",
      constraints: "accurate cost estimation, security assessment, minimal downtime",
      preferences: "serverless architecture, Infrastructure as Code"
    },
    {
      description: "Azure enterprise identity management",
      techStack: "Azure AD, PowerShell, Python, ARM templates, Microsoft Graph",
      features: "SSO integration, role-based access, compliance reporting",
      constraints: "enterprise security standards, audit requirements, integration complexity",
      preferences: "PowerShell DSC, Azure Resource Manager templates"
    },
    {
      description: "Kubernetes cluster management platform",
      techStack: "Kubernetes, Helm, Python, Prometheus, Istio, Terraform",
      features: "cluster provisioning, workload management, service mesh",
      constraints: "multi-tenant security, resource quotas, backup strategies",
      preferences: "GitOps deployment, declarative configurations"
    },
    {
      description: "network infrastructure automation",
      techStack: "Cisco IOS, Python, Ansible, NETCONF, Linux, Git",
      features: "configuration management, network validation, change tracking",
      constraints: "zero-touch provisioning, compliance validation, rollback capability",
      preferences: "network as code, automated testing, version control"
    },
    {
      description: "DevOps monitoring and alerting system",
      techStack: "Prometheus, Grafana, Python, Kubernetes, Terraform, AlertManager",
      features: "metric collection, custom dashboards, intelligent alerting",
      constraints: "low latency, high availability, cost-effective storage",
      preferences: "infrastructure monitoring, SRE best practices"
    },
    {
      description: "cloud security compliance framework",
      techStack: "AWS Security Hub, Azure Security Center, Python, Terraform, Palo Alto",
      features: "security posture assessment, compliance reporting, automated remediation",
      constraints: "regulatory compliance, real-time monitoring, audit trails",
      preferences: "security as code, automated policy enforcement"
    },
    {
      description: "Linux container orchestration platform",
      techStack: "Docker, Kubernetes, Linux, Python, Helm, CNI plugins",
      features: "container lifecycle management, networking, storage orchestration",
      constraints: "production-grade reliability, security isolation, performance optimization",
      preferences: "container security best practices, efficient resource utilization"
    },
    {
      description: "hybrid cloud networking solution",
      techStack: "Cisco SD-WAN, AWS Direct Connect, Azure ExpressRoute, Python, Terraform",
      features: "site-to-site connectivity, traffic optimization, failover mechanisms",
      constraints: "bandwidth optimization, security encryption, redundancy requirements",
      preferences: "software-defined networking, automated provisioning"
    },
    {
      description: "infrastructure cost optimization platform",
      techStack: "AWS Cost Explorer, Azure Cost Management, Python, Terraform, Kubernetes",
      features: "cost tracking, rightsizing recommendations, budget alerts",
      constraints: "accurate cost allocation, multi-cloud support, real-time analysis",
      preferences: "FinOps practices, automated cost optimization"
    },
    {
      description: "system administration automation suite",
      techStack: "Linux, Python, Ansible, Bash, Systemd, Cron",
      features: "configuration management, patch management, backup automation",
      constraints: "minimal downtime, rollback capabilities, security compliance",
      preferences: "idempotent operations, configuration drift detection"
    },
    {
      description: "network security policy management",
      techStack: "Palo Alto Panorama, Cisco ASA, Python, REST APIs, Linux",
      features: "policy automation, rule optimization, security validation",
      constraints: "zero-trust architecture, compliance requirements, change approval",
      preferences: "API-driven automation, version-controlled policies"
    },
    {
      description: "cloud-native observability platform",
      techStack: "Kubernetes, Prometheus, Jaeger, Python, Elasticsearch, Grafana",
      features: "distributed tracing, metrics collection, log aggregation",
      constraints: "low overhead monitoring, scalable storage, real-time insights",
      preferences: "OpenTelemetry standards, cloud-native tooling"
    },
    {
      description: "DevOps secret management system",
      techStack: "HashiCorp Vault, Kubernetes, Python, Terraform, AWS KMS, Azure Key Vault",
      features: "secret rotation, access policies, encryption at rest",
      constraints: "zero-knowledge architecture, audit logging, high availability",
      preferences: "secret as code, automated rotation policies"
    },
    {
      description: "multi-region disaster recovery solution",
      techStack: "AWS, Azure, Terraform, Python, Kubernetes, Cisco networking",
      features: "automated failover, data replication, recovery testing",
      constraints: "RTO/RPO requirements, cost optimization, compliance preservation",
      preferences: "infrastructure automation, chaos engineering"
    },
    {
      description: "Linux performance optimization toolkit",
      techStack: "Linux, Python, eBPF, Perf, SystemTap, Prometheus",
      features: "performance profiling, bottleneck identification, optimization recommendations",
      constraints: "minimal system impact, production-safe monitoring, actionable insights",
      preferences: "kernel-level observability, data-driven optimization"
    }
  ];

  // Select a random project for the knowledge base prompt
  const randomIndex = Math.floor(Math.random() * itProjects.length);
  const project = itProjects[randomIndex];

  return `I'm starting a new project and I'd like to create a knowledge base for you to reference throughout our development process. The project is ${project.description}. We'll be using ${project.techStack}. The key features we need to implement are ${project.features}. Some important constraints to keep in mind are ${project.constraints}. In terms of coding style, we prefer ${project.preferences}. Keep track of this project through a CSV file, where you update the CSV file with each step of the project that we complete. Can you summarize this information and suggest any additional details we should include in our knowledge base?`;
};
