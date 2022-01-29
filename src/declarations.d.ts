import { DocumentNode } from 'graphql'

declare module "*.gql" {
  const content: DocumentNode;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare global {
  interface Window { analytics: SegmentAnalytics.AnalyticsJS; }
}