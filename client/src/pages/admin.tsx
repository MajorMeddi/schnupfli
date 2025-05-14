import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Spruch } from "@shared/schema";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user is already authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setAuthenticated(true);
    }
  }, []);

  // Fetch all Sprueche for admin review, including those with zur_pruefung status
  const { data: sprueche, isLoading } = useQuery<Spruch[]>({
    queryKey: ["/api/admin/sprueche"],
    enabled: authenticated, // Only fetch if authenticated
  });

  // Approve a Spruch
  const approveMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("PUT", `/api/admin/spruch/${id}/approve`, {});
    },
    onSuccess: () => {
      toast({
        title: "Erfolg",
        description: "Spruch wurde freigegeben",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sprueche"] });
    },
  });

  // Reject a Spruch
  const rejectMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("PUT", `/api/admin/spruch/${id}/reject`, {});
    },
    onSuccess: () => {
      toast({
        title: "Erfolg",
        description: "Spruch wurde abgelehnt",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sprueche"] });
    },
  });

  // Handle login
  const handleLogin = () => {
    // Simple password check - in a real app, this would be server-side
    if (password === "8707") {
      setAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      toast({
        title: "Fehler",
        description: "Falsches Passwort",
        variant: "destructive",
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("adminAuth");
  };

  // Render login screen if not authenticated
  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin Passwort"
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleLogin}
              >
                Anmelden
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Button variant="outline" onClick={handleLogout}>Abmelden</Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sprüche zur Überprüfung</h2>
        
        {isLoading ? (
          <p>Lade Sprüche...</p>
        ) : sprueche && sprueche.length > 0 ? (
          <div className="space-y-4">
            {sprueche.map((spruch: Spruch) => (
              <Card key={spruch.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg mb-2">{spruch.text}</p>
                      <div className="text-sm text-gray-500 mb-2">
                        {spruch.eingereicht_von ? (
                          <span>Von: {spruch.eingereicht_von}</span>
                        ) : (
                          <span>Anonym</span>
                        )}
                        <span className="mx-2">•</span>
                        <span>Erstellt am: {new Date(spruch.erstellt_am).toLocaleDateString()}</span>
                      </div>
                      <Badge className={
                        spruch.status === "freigegeben" 
                          ? "bg-green-100 text-green-800" 
                          : spruch.status === "abgelehnt"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }>
                        {spruch.status === "freigegeben" 
                          ? "Freigegeben" 
                          : spruch.status === "abgelehnt"
                          ? "Abgelehnt"
                          : "Zur Prüfung"}
                      </Badge>
                    </div>
                    
                    {spruch.status === "zur_pruefung" && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                          onClick={() => approveMutation.mutate(spruch.id)}
                          disabled={approveMutation.isPending}
                        >
                          Freigeben
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                          onClick={() => rejectMutation.mutate(spruch.id)}
                          disabled={rejectMutation.isPending}
                        >
                          Ablehnen
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">
            Keine Sprüche zur Überprüfung vorhanden.
          </p>
        )}
      </div>
    </div>
  );
}