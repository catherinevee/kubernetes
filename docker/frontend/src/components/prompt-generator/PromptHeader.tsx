
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PromptHeaderProps {
  metapromptContent: string;
  isMetapromptDialogOpen: boolean;
  setIsMetapromptDialogOpen: (open: boolean) => void;
  onCopyMetaprompt: () => void;
  onClaudeMetaprompt: () => void;
  onRefinePrompt: () => void;
  onDiffAnalyzing: () => void;
  onLockFiles: () => void;
  onUserFlow: () => void;
}

export function PromptHeader({
  metapromptContent,
  isMetapromptDialogOpen,
  setIsMetapromptDialogOpen,
  onCopyMetaprompt,
  onClaudeMetaprompt,
  onRefinePrompt,
  onDiffAnalyzing,
  onLockFiles,
  onUserFlow,
}: PromptHeaderProps) {
  return (
    <div className="text-center py-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <h1 className="text-4xl font-bold text-gray-900">Context Engineering with Purpose</h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Designing practical and effective prompts
        </p>
        <Dialog open={isMetapromptDialogOpen} onOpenChange={setIsMetapromptDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-white">
              Metaprompting Designs
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Metaprompting Designs</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Tabs defaultValue="metaprompt" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="metaprompt">Metaprompt</TabsTrigger>
                  <TabsTrigger value="example1">Example Reply 1</TabsTrigger>
                  <TabsTrigger value="example2">Example Reply 2</TabsTrigger>
                  <TabsTrigger value="example3">Example Reply 3</TabsTrigger>
                </TabsList>
                
                <TabsContent value="metaprompt" className="space-y-4">
                  {metapromptContent ? (
                    <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                        {metapromptContent}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Content will dynamically appear here.</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={onClaudeMetaprompt}>
                      Claude.MD
                    </Button>
                    <Button variant="outline" size="sm" onClick={onRefinePrompt}>
                      Refine Prompt
                    </Button>
                    <Button variant="outline" size="sm" onClick={onDiffAnalyzing}>
                      Diff Analyzing
                    </Button>
                    <Button variant="outline" size="sm" onClick={onLockFiles}>
                      Lock Files
                    </Button>
                    <Button variant="outline" size="sm" onClick={onUserFlow}>
                      User Flow
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="example1" className="space-y-4">
                  <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
{`if the user selects AWS, add these variables to the provider "aws" {} block:
  alias = "catherineprod"
  access_key = var.access_key
  secret_key = var.secret_key
and add these variables to the Generated Terraform Code:
variable "access_key" {}
variable "secret_key" {}`}
                    </pre>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={onClaudeMetaprompt}>
                      Claude.MD
                    </Button>
                    <Button variant="outline" size="sm" onClick={onRefinePrompt}>
                      Refine Prompt
                    </Button>
                    <Button variant="outline" size="sm" onClick={onDiffAnalyzing}>
                      Diff Analyzing
                    </Button>
                    <Button variant="outline" size="sm" onClick={onLockFiles}>
                      Lock Files
                    </Button>
                    <Button variant="outline" size="sm" onClick={onUserFlow}>
                      User Flow
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="example2" className="space-y-4">
                  <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
{`Remove these two components from the Architecture Approach:
    Validation Layer: Verify output and suggest improvements
    Logging System: CSV tracking for audit and debugging`}
                    </pre>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={onClaudeMetaprompt}>
                      Claude.MD
                    </Button>
                    <Button variant="outline" size="sm" onClick={onRefinePrompt}>
                      Refine Prompt
                    </Button>
                    <Button variant="outline" size="sm" onClick={onDiffAnalyzing}>
                      Diff Analyzing
                    </Button>
                    <Button variant="outline" size="sm" onClick={onLockFiles}>
                      Lock Files
                    </Button>
                    <Button variant="outline" size="sm" onClick={onUserFlow}>
                      User Flow
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="example3" className="space-y-4">
                  <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
{`perform 10 separate unit tests of CloudFormation-to-HCL programming langauge conversions using CloudFormation templates from this repo: https://github.com/aws-cloudformation/aws-cloudformation-templates

A unit test consists of one conversion from a valid CloudFormation file into valid Terraform code (that gets shown on the web page in the Terraform Output section.) The unit tests must succeed. A successful unit test means that the output is valid Terraform code. An example of valid Terraform code for AWS resources is: https://registry.terraform.io/providers/hashicorp/aws/latest/docs`}
                    </pre>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={onClaudeMetaprompt}>
                      Claude.MD
                    </Button>
                    <Button variant="outline" size="sm" onClick={onRefinePrompt}>
                      Refine Prompt
                    </Button>
                    <Button variant="outline" size="sm" onClick={onDiffAnalyzing}>
                      Diff Analyzing
                    </Button>
                    <Button variant="outline" size="sm" onClick={onLockFiles}>
                      Lock Files
                    </Button>
                    <Button variant="outline" size="sm" onClick={onUserFlow}>
                      User Flow
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
