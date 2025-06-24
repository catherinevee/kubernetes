
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart, Shuffle, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PromptFormData } from './types';

interface PromptFormProps {
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
}

export function PromptForm({
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
  setGeneratedPrompt
}: PromptFormProps) {
  const handleGenerateStarterPrompt = () => {
    const starterPrompt = `You are an expert in [specific functionality] with deep knowledge of best practices and design patterns.

I need to implement [specific functionality] in [programming language].

Key requirements:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

Please consider:
- Error handling
- Edge cases
- Performance optimization
- Best practices for [language/framework]

Think through responses carefully and provide your thought process in the chat. If you have questions or if the instructions are unclear, ask me.`;
    
    setGeneratedPrompt(starterPrompt);
    toast.success("Starter prompt generated!");
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Creating an Effective Prompt
        </CardTitle>
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
      <CardContent className="space-y-4">
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
            placeholder="Define the project requirements and specifications"
            value={formData.projectRequirements}
            onChange={(e) => updateFormData('projectRequirements', e.target.value)}
            className="min-h-[60px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contextTracking">Context Tracking</Label>
          <Textarea
            id="contextTracking"
            placeholder="ex. 'Use a CSV file to monitor the progress of the project and update the file each time progress is made to the progress.''"
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
      </CardContent>
    </Card>
  );
}
