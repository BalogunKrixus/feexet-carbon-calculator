import { ComponentType } from 'react';

export interface TransportMode {
  value: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  baseDistance: number;
  tooltip: string;
}