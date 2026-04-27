import { z } from 'zod';

export const renovationSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  phone: z.string().min(10, "Valid Phone Number is required"),
  email: z.string().email("Invalid email format"),
  corporateName: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service type"),
  budget: z.string().optional(),
  projectDetails: z.string().min(10, "Please provide more project details"),
});

export const scrapSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  phone: z.string().min(10, "Valid Phone Number is required"),
  email: z.string().email("Invalid email format"),
  scrapType: z.string().min(1, "Please select scrap type"),
  quantity: z.string().min(1, "Estimated quantity is required"),
  addressMessage: z.string().min(5, "Please provide pickup address and details"),
});

export const contactSchema = z.object({
  name: z.string().min(3, "Full Name is required"),
  phone: z.string().min(10, "Valid Phone Number is required"),
  email: z.string().email("Invalid email format"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more details"),
});

export type RenovationLead = z.infer<typeof renovationSchema>;
export type ScrapLead = z.infer<typeof scrapSchema>;
export type ContactLead = z.infer<typeof contactSchema>;
