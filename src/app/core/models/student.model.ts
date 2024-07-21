export interface Student {
    id: string;
    userId: string;
    user: {
      id: string;
      tenantId: string;
      email: string;
      firstName: string;
      lastName: string;
      role: number;
      status: number;
    };
    code: string;
  }