
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { PromptFormData } from './types';
import { randomPrompts } from './random-prompts';
import { generatePrompt } from './prompt-utils';
import { getClaudeMetaprompt, getRefinePrompt } from './metaprompt-utils';

export function usePromptGenerator() {
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
  const [isMetapromptDialogOpen, setIsMetapromptDialogOpen] = useState(false);

  const updateFormData = (field: keyof PromptFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * randomPrompts.length);
    const randomPrompt = randomPrompts[randomIndex];
    
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

  return {
    formData,
    generatedPrompt,
    metapromptContent,
    isGenerating,
    includeXmlTags,
    addProjectKnowledgeBase,
    addStepByStep,
    isMetapromptDialogOpen,
    updateFormData,
    setIncludeXmlTags,
    setAddProjectKnowledgeBase,
    setAddStepByStep,
    setIsMetapromptDialogOpen,
    setGeneratedPrompt,
    generateRandomPrompt,
    handleGenerate,
    copyToClipboard,
    copyMetapromptToClipboard,
    clearForm,
    handleClaudeMetaprompt,
    handleRefinePrompt,
    handleDiffAnalyzing,
    handleLockFiles,
    handleUserFlow,
  };
}
