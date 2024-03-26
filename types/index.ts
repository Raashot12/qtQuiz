export interface ApiStateInterface {
  data?: {
    error?: {
      code: number;
      message: string;
      details: null;
      validationErrors: null;
    };
  };
}
