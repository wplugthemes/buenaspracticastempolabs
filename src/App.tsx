import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PublicRoute } from "./components/layout/PublicRoute";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { Layout } from "./components/layout/Layout";
import { Toaster } from "./components/ui/toaster";
import Home from "./components/home";
import HygienePage from "./pages/hygiene";
import LoginPage from "./pages/login";
import LandingPage from "./pages/landing";
import DocumentSetupPage from "./pages/documents/setup";
import DocumentsPage from "./pages/documents";
import PestControlPage from "./pages/pest-control";
import WastePage from "./pages/waste";
import CleaningPage from "./pages/cleaning";
import AssessmentPage from "./pages/assessment";
import routes from "tempo-routes";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hygiene"
            element={
              <ProtectedRoute>
                <Layout>
                  <HygienePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents/setup"
            element={
              <ProtectedRoute>
                <Layout>
                  <DocumentSetupPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <Layout>
                  <DocumentsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pest-control"
            element={
              <ProtectedRoute>
                <Layout>
                  <PestControlPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/waste"
            element={
              <ProtectedRoute>
                <Layout>
                  <WastePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cleaning"
            element={
              <ProtectedRoute>
                <Layout>
                  <CleaningPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <Layout>
                  <AssessmentPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
