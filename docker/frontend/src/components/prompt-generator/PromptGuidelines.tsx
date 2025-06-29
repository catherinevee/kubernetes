
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PromptGuidelines() {
  return (
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
  );
}
