

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
    
    toast.success("[!] Random prompt generated.");
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
    
    toast.success("[!] Prompt generated successfully.");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast.success("[!] Copied to clipboard!");
    } catch (error) {
      toast.error("[X] Failed to copy to clipboard.");
    }
  };

  const copyMetapromptToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(metapromptContent);
      toast.success("[!] Metaprompt copied to clipboard!");
    } catch (error) {
      toast.error("[X] Failed to copy metaprompt to clipboard.");
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
    toast.success("[!] All fields cleared.");
  };

  const handleClaudeMetaprompt = () => {
    const claudeMetaprompt = getClaudeMetaprompt();
    setMetapromptContent(claudeMetaprompt);
    toast.success("[!] Claude metaprompt loaded.");
  };

  const handleRefinePrompt = () => {
    const refinePromptText = getRefinePrompt();
    setMetapromptContent(refinePromptText);
    toast.success("[!] Refine prompt loaded.");
  };

  const handleDiffAnalyzing = () => {
    const diffAnalyzingText = "Implement modifications to the feature while ensuring core functionality, other features, and processes remain unaffected. Evaluate its behavior and dependencies to identify potential risks, and discuss any concerns before moving forward. Conduct thorough testing to verify there are no regressions or unintended consequences, and highlight any out-of-scope changes for review. Exercise caution—take a moment to pause if uncertain.";
    setMetapromptContent(diffAnalyzingText);
    toast.success("[!] Diff analyzing prompt loaded.");
  };

  const handleLockFiles = () => {
    const lockFilesText = "This update is quite delicate and requires utmost precision. Carefully examine all dependencies and potential impacts before implementing any changes, and test systematically to guarantee nothing is disrupted. Steer clear of shortcuts or assumptions—take a moment to seek clarification if you're unsure. Precision is crucial.";
    setMetapromptContent(lockFilesText);
    toast.success("[!] Lock files prompt loaded.");
  };

  const handleUserFlow = () => {
    const userFlowText = "Users begin their experience on the landing page, where they can click the sign-up button to register with Google, subsequently accessing the dashboard. The dashboard comprises X sections.";
    setMetapromptContent(userFlowText);
    toast.success("[!] User flow prompt loaded.");
  };

  return (
    <div className="min-h-screen p-4" style={{ background: '#E6B1C7' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Toolbar />

        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Context Engineering with Purpose</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Designing practical and effective prompts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>
                  Components of an Effective Prompt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Asking the AI</span> It is useful to include a section in your prompt for the AI tool to ask questions about your prompt. This reduces the gap between your project intentions (i.e. your mind) and how the AI interprets the task.
                  </div>                   
                  <div>
                    <span className="font-semibold">Taking Screenshots</span> If you are unable to come up with the words for the thing you want to edit, try taking a screenshot and uploading it. Refer to the uploaded image or screenshot in your reply to the AI.
                  </div>                     
                  <div>
                    <span className="font-semibold">Asking to Improve The Prompt:</span> When you write your prompt, ask the AI if the prompt you provided can be made more concise or detailed.
                  </div>                  
                  <div>
                    <span className="font-semibold">Retaining Context:</span> e.g. "During the implementation of the project, record each step into a separate CSV file. Each step should include information about any written code and its purpose to the overall project."
                  </div>
                  <div>
                    <span className="font-semibold">Being Specific:</span> e.g. Explain specific frameworks and technologies for your project. If you don't have a preference, you can leave that to the tool.
                  </div>
                  <div>
                    <span className="font-semibold">Focused Formatting:</span> e.g. Use XML tags in-between segments of your prompt or place vital information/questions at the beginning or end of a prompt.
                  </div>
                  <div>
                    <span className="font-semibold">Using Examples:</span> e.g. Upload a URL, an image, a code snippet, etc. to make your request to the AI more clear. 
                  </div>
                  <div>
                    <span className="font-semibold">Playing Roles:</span> e.g. Instruct the model to take the role of an expert in the topic you are planning.
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
                <CardTitle>
                  Metaprompting
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
                    <p>Content will dynamically appear here.</p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {metapromptContent && (
                    <Button variant="outline" size="sm" onClick={copyMetapromptToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleClaudeMetaprompt}>
                    Claude.MD
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
