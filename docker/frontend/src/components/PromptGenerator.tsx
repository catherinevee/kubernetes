
import React from 'react';
import { Toolbar } from './prompt-generator/Toolbar';
import { PromptHeader } from './prompt-generator/PromptHeader';
import { PromptGuidelines } from './prompt-generator/PromptGuidelines';
import { CombinedPromptCard } from './prompt-generator/CombinedPromptCard';
import { usePromptGenerator } from './prompt-generator/usePromptGenerator';

export function PromptGenerator() {
  const {
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
  } = usePromptGenerator();

  return (
    <div className="min-h-screen p-4" style={{ background: '#E6B1C7' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Toolbar />

        <PromptHeader
          metapromptContent={metapromptContent}
          isMetapromptDialogOpen={isMetapromptDialogOpen}
          setIsMetapromptDialogOpen={setIsMetapromptDialogOpen}
          onCopyMetaprompt={copyMetapromptToClipboard}
          onClaudeMetaprompt={handleClaudeMetaprompt}
          onRefinePrompt={handleRefinePrompt}
          onDiffAnalyzing={handleDiffAnalyzing}
          onLockFiles={handleLockFiles}
          onUserFlow={handleUserFlow}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <PromptGuidelines />

          <CombinedPromptCard
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
            generatedPrompt={generatedPrompt}
            onCopy={copyToClipboard}
          />
        </div>
      </div>
    </div>
  );
}
