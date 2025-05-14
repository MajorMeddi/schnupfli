import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import SubmitPage from "@/pages/submit";
import AdminPage from "@/pages/admin";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuccessNotification from "@/components/SuccessNotification";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/submit" component={SubmitPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const displaySuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
          <Header />
          <main className="flex-1 py-8 px-6">
            <div className="max-w-3xl mx-auto">
              <Toaster />
              <Router />
            </div>
          </main>
          <Footer />
          {showSuccess && <SuccessNotification />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
