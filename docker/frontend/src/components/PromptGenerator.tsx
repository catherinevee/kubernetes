
import React, { useState, useEffect } from 'react';
import { Heart, Copy, Info } from "lucide-react";
import { toast } from "sonner";
import { PromptFormData } from './prompt-generator/types';
import { randomPrompts } from './prompt-generator/random-prompts';
import { generatePrompt } from './prompt-generator/prompt-utils';
import { generateKnowledgeBasePrompts } from './prompt-generator/knowledge-base-utils';
import { getClaudeMetaprompt, getRefinePrompt } from './prompt-generator/metaprompt-utils';
import { Toolbar } from './prompt-generator/Toolbar';
import { PromptForm } from './prompt-generator/PromptForm';
import { PromptDisplay } from './prompt-generator/PromptDisplay';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PromptGenerator() {
  const [formData, setFormData] = useState<PromptFormData>({
    projectRequirements: '',
    contextTracking: '',
    relationalContext: '',
    specificTask: '',
    guidelines: '',
    taskConstraints: '',
    finopsConsiderations: ''
  });
  
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [metapromptContent, setMetapromptContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [includeXmlTags, setIncludeXmlTags] = useState(false);
  const [addProjectKnowledgeBase, setAddProjectKnowledgeBase] = useState(false);
  const [addStepByStep, setAddStepByStep] = useState(false);

  const updateFormData = (field: keyof PromptFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    const randomPrompt = randomPrompts[randomIndex];
    
    // Clear all fields first, then set the random prompt
    setFormData({
      projectRequirements: randomPrompt.projectRequirements,
      contextTracking: randomPrompt.contextTracking,
      relationalContext: randomPrompt.relationalContext,
      specificTask: randomPrompt.specificTask,
      guidelines: randomPrompt.guidelines,
      taskConstraints: randomPrompt.taskConstraints,
      finopsConsiderations: randomPrompt.finopsConsiderations
    });
    
    toast.success("Random prompt generated! Review and modify as needed.");
  };

  // Real-time prompt generation as user types
  useEffect(() => {
    const prompt = generatePrompt(formData, includeXmlTags, addProjectKnowledgeBase, addStepByStep);
    setGeneratedPrompt(prompt);
  }, [formData, includeXmlTags, addProjectKnowledgeBase, addStepByStep]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const prompt = generatePrompt(formData, includeXmlTags, addProjectKnowledgeBase, addStepByStep);
    setGeneratedPrompt(prompt);
    setIsGenerating(false);
    
    toast.success("Prompt generated successfully!");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const copyMetapromptToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(metapromptContent);
      toast.success("Metaprompt copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy metaprompt to clipboard");
    }
  };

  const clearForm = () => {
    setFormData({
      projectRequirements: '',
      contextTracking: '',
      relationalContext: '',
      specificTask: '',
      guidelines: '',
      taskConstraints: '',
      finopsConsiderations: ''
    });
    setGeneratedPrompt('');
    setMetapromptContent('');
    setIncludeXmlTags(false);
    setAddProjectKnowledgeBase(false);
    setAddStepByStep(false);
    toast.success("All fields cleared");
  };

  const handleGenerateKnowledgeBase = () => {
    const allPrompts = generateKnowledgeBasePrompts();
    setGeneratedPrompt(allPrompts);
    toast.success("10 project knowledge base prompts generated!");
  };

  const handleClaudeMetaprompt = () => {
    const claudeMetaprompt = getClaudeMetaprompt();
    setMetapromptContent(claudeMetaprompt);
    toast.success("Claude metaprompt loaded!");
  };

  const handleRefinePrompt = () => {
    const refinePromptText = getRefinePrompt();
    setMetapromptContent(refinePromptText);
    toast.success("Refine prompt loaded!");
  };

  const handleDiffAnalyzing = () => {
    const diffAnalyzingText = "Implement modifications to the feature while ensuring core functionality, other features, and processes remain unaffected. Evaluate its behavior and dependencies to identify potential risks, and discuss any concerns before moving forward. Conduct thorough testing to verify there are no regressions or unintended consequences, and highlight any out-of-scope changes for review. Exercise caution—take a moment to pause if uncertain.";
    setMetapromptContent(diffAnalyzingText);
    toast.success("Diff analyzing prompt loaded!");
  };

  const handleLockFiles = () => {
    const lockFilesText = "This update is quite delicate and requires utmost precision. Carefully examine all dependencies and potential impacts before implementing any changes, and test systematically to guarantee nothing is disrupted. Steer clear of shortcuts or assumptions—take a moment to seek clarification if you're unsure. Precision is crucial.";
    setMetapromptContent(lockFilesText);
    toast.success("Lock files prompt loaded!");
  };

  const handleUserFlow = () => {
    const userFlowText = "Users begin their experience on the landing page, where they can click the sign-up button to register with Google, subsequently accessing the dashboard. The dashboard comprises X sections.";
    setMetapromptContent(userFlowText);
    toast.success("User flow prompt loaded!");
  };

  return (
    <div className="min-h-screen p-4" style={{ background: '#E6B1C7' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Toolbar />

        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">CatPrompt: Effective Prompt Engineering</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creating prompts that focus on adding value
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Basic Structure of an Effective Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Be explicit:</span> Instead of "build a login page," specify "create a login page using React, with email/password authentication and JWT handling."
                  </div>
                  <div>
                    <span className="font-semibold">Set constraints:</span> If you need a specific tech stack (e.g., Supabase for authentication), state it clearly.
                  </div>
                  <div>
                    <span className="font-semibold">Use formatting tricks:</span> AI prioritizes the beginning and end of prompts—put important details upfront.
                  </div>
                </div>
              </CardContent>
            </Card>

            <PromptForm
              formData={formData}
              updateFormData={updateFormData}
              includeXmlTags={includeXmlTags}
              setIncludeXmlTags={setIncludeXmlTags}
              addProjectKnowledgeBase={addProjectKnowledgeBase}
              setAddProjectKnowledgeBase={setAddProjectKnowledgeBase}
              addStepByStep={addStepByStep}
              setAddStepByStep={setAddStepByStep}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              onClear={clearForm}
              onGenerateRandom={generateRandomPrompt}
              setGeneratedPrompt={setGeneratedPrompt}
            />
          </div>

          <div className="space-y-6">
            <PromptDisplay
              generatedPrompt={generatedPrompt}
              includeXmlTags={includeXmlTags}
              onCopy={copyToClipboard}
            />

            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Metaprompting
                  <div className="flex gap-2">
                    {metapromptContent && (
                      <Button variant="outline" size="sm" onClick={copyMetapromptToClipboard}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleClaudeMetaprompt}>
                      Claude.md
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRefinePrompt}>
                      Refine Prompt
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDiffAnalyzing}>
                      Diff Analyzing
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLockFiles}>
                      Lock Files
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleUserFlow}>
                      User Flow
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {metapromptContent ? (
                  <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                      {metapromptContent}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Metaprompt content will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
