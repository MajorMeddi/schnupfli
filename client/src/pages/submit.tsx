import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertSpruchSchema } from "@shared/schema";
import { ArrowLeft, Send, Sparkles } from "lucide-react";

// Create schema with validation based on the fields we need
const extendedSpruchSchema = z.object({
  text: z.string().min(5, {
    message: "Der Spruch muss mindestens 5 Zeichen lang sein",
  }),
  eingereicht_von: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof extendedSpruchSchema>;

export default function SubmitPage() {
  const [, navigate] = useLocation();
  
  // Form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(extendedSpruchSchema),
    defaultValues: {
      text: "",
      eingereicht_von: "",
    },
  });

  // Mutation for submitting a new Spruch
  const submitMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest("POST", "/api/spruch/submit", data);
    },
    onSuccess: () => {
      // Redirect to home page with success flag
      navigate("/?success=true");
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    submitMutation.mutate(data);
  };

  // Navigate back to home
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 animate-fade-in">
      <Card className="bg-white dark:bg-sage-deep rounded-xl shadow-lg border border-sage-dark overflow-hidden">
        <CardHeader className="pb-3 pt-6">
          <div className="flex items-center justify-center border-b border-sage-dark pb-6 relative">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={goToHome} 
              className="absolute left-0 text-sage-forest dark:text-sage-light hover:text-sage-medium hover:bg-sage-light/30"
            >
              <ArrowLeft size={20} />
            </Button>
            <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sage-dark to-sage-medium">
              Schnupfspruch einreichen
            </h2>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-center gap-2 mb-8 bg-sage-light p-3 rounded-lg">
            <Sparkles size={18} className="text-sage-dark" />
            <p className="text-foreground/80 text-sm">
              Teile deinen Spruch mit der Community. Nach kurzer Prüfung wird er veröffentlicht.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-foreground">Dein Schnupfspruch</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Gib hier deinen Schnupfspruch ein..." 
                        className="min-h-[120px] border-input focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="eingereicht_von"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-foreground">Dein Name (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Wie sollen wir dich nennen?" 
                        className="border-input focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg" 
                        value={field.value || ""} 
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-sage-medium text-white hover:bg-sage-dark rounded-lg font-medium py-3 flex items-center justify-center gap-2"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wird eingereicht...
                    </span>
                  ) : (
                    <>
                      <Send size={16} />
                      Spruch einreichen
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
