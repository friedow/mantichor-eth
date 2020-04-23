export interface RoleMapping {
  role: string;
  address: string;
}

export interface deployChoreographyRequest {
  xml: string;
  mappings: RoleMapping[];
}

export interface executeTaskRequest {
  address: string;
  task: string[];
}
