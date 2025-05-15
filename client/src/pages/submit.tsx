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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  content: z.string().min(5, {
    message: "Der Spruch muss mindestens 5 Zeichen lang sein",
  }),
  author: z.string().optional(),
  dialect: z.string().default('standard'),
  region: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitPage() {
  const [, navigate] = useLocation();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      author: "",
      dialect: "standard",
      region: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const { error } = await supabase
        .from('schnupfsprueche')
        .insert([{
          content: data.content,
          author: data.author || 'Anonym',
          dialect: data.dialect,
          region: data.region || null,
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      navigate("/?success=true");
    },
  });

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
              Teile deinen Spruch mit der Community
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sage-forest">Dein Schnupfspruch</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Gib hier deinen Schnupfspruch ein..." 
                        className="min-h-[120px] border-sage-dark focus:border-sage-medium focus:ring-2 focus:ring-sage-medium/20 rounded-lg resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-sage-forest" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sage-forest">Dein Name (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Wie sollen wir dich nennen?" 
                        className="border-sage-dark focus:border-sage-medium focus:ring-2 focus:ring-sage-medium/20 rounded-lg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-sage-forest" />
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
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
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