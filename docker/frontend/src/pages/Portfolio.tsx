
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toolbar } from '@/components/prompt-generator/Toolbar';
import { ExternalLink, Cloud } from "lucide-react";
import { EthernetPort } from "lucide-react";

export default function Portfolio() {
  return (
    <div className="min-h-screen p-4" style={{ background: '#717ec9' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Toolbar />

        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-white">Catherine Vee</h1>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-white max-w-2xl mx-auto">
              Network Engineer, DevOps Engineer
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-700 mb-4">
                Passionate about technology.
              </p>
              <div className="text-center space-y-2">
                <a 
                  href="https://github.com/catherinevee/code" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm no-underline block"
                >
                  github/catherinevee/code
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a 
                  href="https://linkedin.com/in/catherinevee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm no-underline block"
                >
                  linkedin/catherinevee
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">
                Terraform
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.8 1.6L14.1 4.8v6.4L8.8 8V1.6zM15.2 4.8L20.5 8v6.4L15.2 11.2V4.8zM8.8 12.8L14.1 16v6.4L8.8 19.2v-6.4zM3.5 8L8.8 11.2v6.4L3.5 14.4V8z" fill="#623CE4"/>
              </svg>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://github.com/catherinevee/code/tree/main/terraform" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm no-underline"
                >
                  Terraform Projects
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="text-left text-sm text-gray-700 mt-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>Multi-tenant</li>
                  <li>Multi-region</li>
                  <li>Secure Secrets</li>
                  <li>Container-level Security</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">
                Kubernetes
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="#326CE5">
                  <path d="M12.01 1.485c-.1-.033-.2-.033-.3 0l-10.6 3.53c-.133.044-.244.133-.308.248-.064.115-.073.251-.024.372l2.61 6.402c.049.121.148.218.274.27l.026.01 5.322 2.177v.001l.008.003c.165.068.353.068.518 0l.008-.003v-.001l5.322-2.177.026-.01c.126-.052.225-.149.274-.27l2.61-6.402c.049-.121.04-.257-.024-.372-.064-.115-.175-.204-.308-.248L12.01 1.485z"/>
                  <circle cx="12" cy="7.5" r="1.5" fill="white"/>
                  <path d="M12 5.5v1M16 7.5h-1M12 9.5v-1M8 7.5h1" stroke="white" strokeWidth="0.8"/>
                  <path d="M13.5 6.5l-.7.7M13.5 8.5l-.7-.7M10.5 8.5l.7-.7M10.5 6.5l.7.7" stroke="white" strokeWidth="0.8"/>
                </g>
                <path d="M12 11.5l-6 2.5v6l6 3 6-3v-6l-6-2.5z" fill="#326CE5" fillOpacity="0.7"/>
                <circle cx="12" cy="17" r="1" fill="white"/>
                <path d="M12 15v1M15 17h-1M12 19v-1M9 17h1" stroke="white" strokeWidth="0.6"/>
              </svg>
              <a 
                href="https://github.com/catherinevee/code/tree/main/kubernetes-cka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm no-underline"
              >
                Kubernetes
                <ExternalLink className="h-3 w-3" />
              </a>
              <div className="text-left text-sm text-gray-700 mt-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>AKS, EKS, DOKS</li>
                  <li>GitHub Actions, Azure DevOps</li>
                  <li>Helm</li>
                  <li>Falco</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">
                Networking
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <EthernetPort className="h-12 w-12 text-gray-600" />
              <div className="text-left text-sm text-gray-700 mt-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>CCNP, AZ-700, ANS-C01, JNCIA</li>
                  <li>IPv6 + IPv4</li>
                  <li>BGP, OSPF, IS-IS, EIGRP</li>
                  <li>Cisco, Cisco Meraki, Palo Alto, Juniper, Arista</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
