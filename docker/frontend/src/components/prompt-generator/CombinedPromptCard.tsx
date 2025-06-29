
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart, Shuffle, X, Sparkles, Copy } from "lucide-react";
import { toast } from "sonner";
import { PromptFormData } from './types';

interface CombinedPromptCardProps {
  formData: PromptFormData;
  updateFormData: (field: keyof PromptFormData, value: string) => void;
  includeXmlTags: boolean;
  setIncludeXmlTags: (value: boolean) => void;
  addProjectKnowledgeBase: boolean;
  setAddProjectKnowledgeBase: (value: boolean) => void;
  addStepByStep: boolean;
  setAddStepByStep: (value: boolean) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  onClear: () => void;
  onGenerateRandom: () => void;
  setGeneratedPrompt: (prompt: string) => void;
  generatedPrompt: string;
  onCopy: () => void;
}

export function CombinedPromptCard({
  formData,
  updateFormData,
  includeXmlTags,
  setIncludeXmlTags,
  addProjectKnowledgeBase,
  setAddProjectKnowledgeBase,
  addStepByStep,
  setAddStepByStep,
  isGenerating,
  onGenerate,
  onClear,
  onGenerateRandom,
  setGeneratedPrompt,
  generatedPrompt,
  onCopy
}: CombinedPromptCardProps) {
  const handleGenerateStarterPrompt = () => {
    const starterPrompt = `You are an expert in Python Network Automation. You have experience in deploying Cisco IOS and Cisco NXOS migrations."

The implementation of this project must be done step-by-step. Record each step (any written code and why the code was written in relation to the project's purpose) in a separate CSV file. Refer to this CSV file as we move through the steps of the implementation.

I need to create a script that will login to network devices and run a command to gather the running configuration and send them to a remote Linux server.

Key requirements:
1. The script must use Cisco IOS and Cisco NXOS Ansible Modules
2. The script must send the running config over SCP to a server at 10.204.204.25
3. The script must ensure that the server is pingable before the script begins



Think through responses carefully and provide your thought process in the chat. If you have questions or if the instructions are unclear, ask me.`;
    
    setGeneratedPrompt(starterPrompt);
    toast.success("Starter prompt generated!");
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Prompt Builder & Output
          </div>
          {generatedPrompt && (
            <Button variant="outline" size="sm" onClick={onCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          Create an effective prompt and see the generated output
        </CardDescription>
        <div className="pt-2 space-y-2">
          <Button 
            variant="outline" 
            onClick={handleGenerateStarterPrompt}
            className="flex items-center gap-2 w-full"
          >
            <Sparkles className="h-4 w-4" />
            Generate Starter Prompt
          </Button>
          <Button 
            variant="outline" 
            onClick={onGenerateRandom}
            className="flex items-center gap-2 w-full"
          >
            <Shuffle className="h-4 w-4" />
            Generate Sample Prompt
          </Button>
          <Button 
            variant="outline" 
            onClick={onClear}
            className="flex items-center gap-2 w-full"
          >
            <X className="h-4 w-4" />
            Clear All Fields
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specificTask">Specific Task to Achieve *</Label>
            <Textarea
              id="specificTask"
              placeholder="The prompt should be concise, logical, explicit, adaptive, and reflective"
              value={formData.specificTask}
              onChange={(e) => updateFormData('specificTask', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectRequirements">Project Requirements (PRD)</Label>
            <Textarea
              id="projectRequirements"
              value={formData.projectRequirements}
              onChange={(e) => updateFormData('projectRequirements', e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contextTracking">Context Tracking</Label>
            <Textarea
              id="contextTracking"
              value={formData.contextTracking}
              onChange={(e) => updateFormData('contextTracking', e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationalContext">Relational Context of AI Partner</Label>
            <Textarea
              id="relationalContext"
              placeholder="ex. 'You are an expert in prompt engineering.'"
              value={formData.relationalContext}
              onChange={(e) => updateFormData('relationalContext', e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guidelines">Guidelines or Examples</Label>
            <Textarea
              id="guidelines"
              placeholder="ex. provide code snippets or URL references"
              value={formData.guidelines}
              onChange={(e) => updateFormData('guidelines', e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taskConstraints">Task Constraints</Label>
            <Textarea
              id="taskConstraints"
              placeholder="ex. 'The application must use a MongoDB'"
              value={formData.taskConstraints}
              onChange={(e) => updateFormData('taskConstraints', e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="finopsConsiderations">FinOps Considerations</Label>
            <Textarea
              id="finopsConsiderations"
              placeholder="ex. 'turning off unused resources, right-sizing, using cloudcustodian/kubecost/infracost'"
              value={formData.finopsConsiderations}
              onChange={(e) => updateFormData('finopsConsiderations', e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeXmlTags"
                checked={includeXmlTags}
                onChange={(e) => setIncludeXmlTags(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="includeXmlTags" className="text-sm">
                Include XML Tags in Output
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="addStepByStep"
                checked={addStepByStep}
                onChange={(e) => setAddStepByStep(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="addStepByStep" className="text-sm">
                Step-by-Step Implementation
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="addProjectKnowledgeBase"
                checked={addProjectKnowledgeBase}
                onChange={(e) => setAddProjectKnowledgeBase(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="addProjectKnowledgeBase" className="text-sm">
                Add Project Knowledge Base
              </Label>
            </div>
          </div>
        </div>

        {/* Generated Prompt Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Generated Prompt</h3>
          {generatedPrompt ? (
            <div className="space-y-4">
              <div className="bg-gray-50 border rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                  {generatedPrompt}
                </pre>
              </div>
              <div className="text-xs text-gray-500">
                {includeXmlTags && "XML Tags Enabled"}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="text-sm mt-2">Dynamic content will appear after here typing in the "Specific Task to Achieve" field.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
