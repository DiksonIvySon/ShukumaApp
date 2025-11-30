"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TutorialStep {
  title: string
  description: string
  image: string
}

interface TutorialComponentProps {
  title: string
  steps: TutorialStep[]
  onComplete?: () => void
}

export default function TutorialComponent({ title, steps, onComplete }: TutorialComponentProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (onComplete) {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = steps[currentStep]

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6">
        <h2 className="text-2xl font-bold text-primary-foreground">{title}</h2>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Step Image */}
        <div className="bg-gray-100 rounded-lg h-64 mb-6 flex items-center justify-center">
          <img
            src={step.image || "/placeholder.svg"}
            alt={step.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">
            Step {currentStep + 1}: {step.title}
          </h3>
          <p className="text-gray-600 text-lg">{step.description}</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? "bg-primary" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-6 flex gap-4 justify-between border-t border-border">
        <Button onClick={handlePrev} disabled={currentStep === 0} variant="outline">
          Previous
        </Button>

        <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  )
}
