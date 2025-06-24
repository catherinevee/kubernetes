
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Sparkles } from "lucide-react";

interface PromptDisplayProps {
  generatedPrompt: string;
  includeXmlTags: boolean;
  onCopy: () => void;
}

export function PromptDisplay({ generatedPrompt, includeXmlTags, onCopy }: PromptDisplayProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Generated Prompt
          {generatedPrompt && (
            <Button variant="outline" size="sm" onClick={onCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          The prompt template completes as you type.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <p>Completed prompt will appear here.</p>
            <p className="text-sm mt-2">Start typing in the "Specific Task to Achieve" field to see the prompt generate automatically</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
