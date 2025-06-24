import { PromptFormData } from './types';

export const generatePrompt = (formData: PromptFormData, includeXmlTags: boolean, addProjectKnowledgeBase: boolean = false, addStepByStep: boolean = false): string => {
  const { projectRequirements, contextTracking, relationalContext, specificTask, guidelines, taskConstraints, finopsConsiderations } = formData;
  
  if (!specificTask) {
    return "";
  }

  let prompt = "";

  // Add step-by-step implementation text at the top if requested
  if (addStepByStep) {
    prompt = "Implement this project one step at a time, recording each step into a CSV file to maintain context of the project. Within each step, record any code written and the reason for writing the code this way.\n\n";
  }

  if (includeXmlTags) {
    // Generate XML-formatted prompt
    prompt += `${relationalContext ? `<role>\n${relationalContext}\n</role>\n\n` : ''}`;
    
    if (projectRequirements) {
      prompt += `<project_requirements>\n${projectRequirements}\n</project_requirements>\n\n`;
    }
    
    if (contextTracking) {
      prompt += `<context>\n${contextTracking}\n</context>\n\n`;
    }
    
    prompt += `<task>\n${specificTask}\n</task>\n\n`;
    
    if (guidelines) {
      prompt += `<guidelines>\n${guidelines}\n</guidelines>\n\n`;
    }
    
    if (taskConstraints) {
      prompt += `<constraints>\n${taskConstraints}\n</constraints>\n\n`;
    }
    
    if (finopsConsiderations) {
      prompt += `<finops_considerations>\n${finopsConsiderations}\n</finops_considerations>\n\n`;
    }
    
    if (addProjectKnowledgeBase) {
      prompt += `<knowledge_base>\nDuring the implementation of this project, remember the decisions that we make and the code that we implement by recording information about them in a separate CSV file.\n</knowledge_base>\n\n`;
    }
    
    return prompt.trim();
  }

  // Generate standard formatted prompt
  prompt += `${relationalContext ? `${relationalContext}` : 'You are an expert assistant.'}

${projectRequirements ? `Project Requirements (PRD): ${projectRequirements}` : ''}

${contextTracking ? `Context Tracking: ${contextTracking}` : ''}

Specific Task: ${specificTask}

${guidelines ? `Guidelines or Examples:
${guidelines}` : ''}

${taskConstraints ? `Task Constraints:
${taskConstraints}` : ''}

${finopsConsiderations ? `FinOps Considerations:
${finopsConsiderations}` : ''}

Please provide a comprehensive and well-structured response.`;

  if (addProjectKnowledgeBase) {
    prompt += `\nDuring the implementation of this project, remember the decisions that we make and the code that we implement by recording information about them in a separate CSV file.\n`;
  }

  return prompt.trim();
};
