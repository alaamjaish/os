export interface CompositionDefinition {
  key: string;
  label: string;
  description: string;
}

export const COMPOSITIONS: Record<string, CompositionDefinition> = {
  centered: {
    key: "centered",
    label: "Centered",
    description: "subject centered in the frame with balanced composition",
  },
  "full-body": {
    key: "full-body",
    label: "Full Body",
    description: "full body view of the subject showing complete form",
  },
  "close-up": {
    key: "close-up",
    label: "Close-up",
    description: "close-up view focusing on key details",
  },
  "wide-shot": {
    key: "wide-shot",
    label: "Wide Shot",
    description: "wide shot showing subject in broader context",
  },
  "action-pose": {
    key: "action-pose",
    label: "Action Pose",
    description: "dynamic action pose with sense of movement",
  },
};
